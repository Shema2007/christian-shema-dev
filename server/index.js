import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'videos.json')
const BLOG_FILE = path.join(__dirname, 'blogs.json')

const app = express()
app.use(cors())
app.use(express.json())

const ADMIN_PIN = process.env.ADMIN_PIN || '13134'

function readVideos() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) } catch { return [] }
}
function writeVideos(v) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(v, null, 2))
}
function readBlogs() {
  try { return JSON.parse(fs.readFileSync(BLOG_FILE, 'utf-8')) } catch { return [] }
}
function writeBlogs(b) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify(b, null, 2))
}

// ── Videos ───────────────────────────────────────────────
app.get('/api/videos', (req, res) => {
  const videos = readVideos()
  const { category } = req.query
  const result = category && category !== 'All'
    ? videos.filter(v => v.category === category)
    : videos
  res.json(result)
})

app.post('/api/videos', (req, res) => {
  const { pin, title, description, url, category } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  if (!title || !url) return res.status(400).json({ error: 'Title and URL are required' })
  const videos = readVideos()
  const newVideo = {
    id: Date.now().toString(),
    title: title.trim(),
    description: (description || '').trim(),
    url: url.trim(),
    thumbnail: getThumbnail(url.trim()),
    category: category || 'Other',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
  videos.unshift(newVideo)
  writeVideos(videos)
  res.status(201).json(newVideo)
})

app.delete('/api/videos/:id', (req, res) => {
  const { pin } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  const videos = readVideos()
  const updated = videos.filter(v => v.id !== req.params.id)
  if (updated.length === videos.length) return res.status(404).json({ error: 'Video not found' })
  writeVideos(updated)
  res.json({ success: true })
})

app.post('/api/auth', (req, res) => {
  const { pin } = req.body
  res.json({ valid: pin === ADMIN_PIN })
})

// ── Blog ─────────────────────────────────────────────────
app.get('/api/blogs', (req, res) => {
  res.json(readBlogs())
})

app.post('/api/blogs', (req, res) => {
  const { pin, title, tag, excerpt, content } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  if (!title || !excerpt) return res.status(400).json({ error: 'Title and excerpt are required' })
  const blogs = readBlogs()
  const newPost = {
    id: Date.now().toString(),
    title: title.trim(),
    tag: (tag || 'General').trim(),
    excerpt: excerpt.trim(),
    content: (content || '').trim(),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
  blogs.unshift(newPost)
  writeBlogs(blogs)
  res.status(201).json(newPost)
})

app.delete('/api/blogs/:id', (req, res) => {
  const { pin } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  const blogs = readBlogs()
  const updated = blogs.filter(b => b.id !== req.params.id)
  if (updated.length === blogs.length) return res.status(404).json({ error: 'Post not found' })
  writeBlogs(updated)
  res.json({ success: true })
})

// ── Contact ───────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields are required' })

  const GMAIL_USER = process.env.GMAIL_USER
  const GMAIL_PASS = process.env.GMAIL_PASS

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.log(`[Contact] From: ${name} <${email}>\n${message}`)
    return res.json({ success: true })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    })
    await transporter.sendMail({
      from: `"${name}" <${GMAIL_USER}>`,
      to: 'christianirasubizashema@gmail.com',
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:12px">
          <h2 style="color:#1d4ed8;margin-top:0">New message via your portfolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;font-weight:600;width:80px">Name</td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
          <p style="color:#111;white-space:pre-wrap;line-height:1.7">${message}</p>
        </div>`,
    })
    res.json({ success: true })
  } catch (err) {
    console.error('[Contact] Email error:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

// ── Helpers ───────────────────────────────────────────────
function getThumbnail(url) {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`
  }
  return ''
}

const PORT = 3001
app.listen(PORT, 'localhost', () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
