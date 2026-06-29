import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'videos.json')
const BLOG_FILE = path.join(__dirname, 'blogs.json')
const TESTIMONIALS_FILE = path.join(__dirname, 'testimonials.json')
const VISITORS_FILE = path.join(__dirname, 'visitors.json')
const DIST_DIR = path.join(__dirname, '..', 'dist')

const app = express()
const PORT = process.env.PORT || 5000
const ADMIN_PIN = process.env.ADMIN_PIN || '13134'
const isProd = process.env.NODE_ENV === 'production'

app.use(cors())
app.use(express.json())

function read(f) { try { return JSON.parse(fs.readFileSync(f, 'utf-8')) } catch { return [] } }
function write(f, d) { fs.writeFileSync(f, JSON.stringify(d, null, 2)) }
function getThumbnail(url) {
  const patterns = [/youtube\.com\/watch\?v=([^&]+)/, /youtu\.be\/([^?]+)/, /youtube\.com\/embed\/([^?]+)/, /youtube\.com\/shorts\/([^?]+)/]
  for (const p of patterns) { const m = url.match(p); if (m) return `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` }
  return ''
}

// ── Videos ───────────────────────────────────────────────
app.get('/api/videos', (req, res) => {
  const videos = read(DATA_FILE)
  const { category } = req.query
  res.json(category && category !== 'All' ? videos.filter(v => v.category === category) : videos)
})
app.post('/api/videos', (req, res) => {
  const { pin, title, description, url, category } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  if (!title || !url) return res.status(400).json({ error: 'Title and URL are required' })
  const videos = read(DATA_FILE)
  const v = {
    id: Date.now().toString(), title: title.trim(),
    description: (description || '').trim(), url: url.trim(),
    thumbnail: getThumbnail(url.trim()), category: category || 'Other',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
  videos.unshift(v); write(DATA_FILE, videos); res.status(201).json(v)
})
app.delete('/api/videos/:id', (req, res) => {
  const { pin } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  const videos = read(DATA_FILE)
  const updated = videos.filter(v => v.id !== req.params.id)
  if (updated.length === videos.length) return res.status(404).json({ error: 'Not found' })
  write(DATA_FILE, updated); res.json({ success: true })
})

// ── Blog ─────────────────────────────────────────────────
app.get('/api/blogs', (req, res) => res.json(read(BLOG_FILE)))
app.post('/api/blogs', (req, res) => {
  const { pin, title, tag, excerpt, content } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  if (!title || !excerpt) return res.status(400).json({ error: 'Title and excerpt are required' })
  const blogs = read(BLOG_FILE)
  const b = {
    id: Date.now().toString(), title: title.trim(), tag: (tag || 'General').trim(),
    excerpt: excerpt.trim(), content: (content || '').trim(),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
  blogs.unshift(b); write(BLOG_FILE, blogs); res.status(201).json(b)
})
app.delete('/api/blogs/:id', (req, res) => {
  const { pin } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  const blogs = read(BLOG_FILE)
  const updated = blogs.filter(b => b.id !== req.params.id)
  if (updated.length === blogs.length) return res.status(404).json({ error: 'Not found' })
  write(BLOG_FILE, updated); res.json({ success: true })
})

// ── Testimonials ──────────────────────────────────────────
app.get('/api/testimonials', (req, res) => res.json(read(TESTIMONIALS_FILE)))
app.post('/api/testimonials', (req, res) => {
  const { pin, name, role, quote, stars } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  if (!name || !quote) return res.status(400).json({ error: 'Name and quote are required' })
  const list = read(TESTIMONIALS_FILE)
  const t = { id: Date.now().toString(), name: name.trim(), role: (role || '').trim(), quote: quote.trim(), stars: Math.min(5, Math.max(1, Number(stars) || 5)) }
  list.unshift(t); write(TESTIMONIALS_FILE, list); res.status(201).json(t)
})
app.delete('/api/testimonials/:id', (req, res) => {
  const { pin } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  const list = read(TESTIMONIALS_FILE)
  const updated = list.filter(t => t.id !== req.params.id)
  if (updated.length === list.length) return res.status(404).json({ error: 'Not found' })
  write(TESTIMONIALS_FILE, updated); res.json({ success: true })
})

// ── Visitors ──────────────────────────────────────────────
function readVisitors() {
  try { return JSON.parse(fs.readFileSync(VISITORS_FILE, 'utf-8')) } catch { return { count: 0 } }
}
function writeVisitors(d) { fs.writeFileSync(VISITORS_FILE, JSON.stringify(d, null, 2)) }

app.get('/api/visitors', (req, res) => res.json(readVisitors()))
app.post('/api/visitors', (req, res) => {
  const data = readVisitors()
  data.count = (data.count || 0) + 1
  writeVisitors(data)
  res.json(data)
})

// ── Auth ──────────────────────────────────────────────────
app.post('/api/auth', (req, res) => res.json({ valid: req.body.pin === ADMIN_PIN }))

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
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASS } })
    await transporter.sendMail({
      from: `"${name}" <${GMAIL_USER}>`, to: 'christianirasubizashema@gmail.com',
      replyTo: email, subject: `Portfolio message from ${name}`,
      html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:12px"><h2 style="color:#1d4ed8;margin-top:0">New message via your portfolio</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;color:#555;font-weight:600;width:80px">Name</td><td style="padding:8px 0">${name}</td></tr><tr><td style="padding:8px 0;color:#555;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr></table><hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/><p style="color:#111;white-space:pre-wrap;line-height:1.7">${message}</p></div>`,
    })
    res.json({ success: true })
  } catch (err) {
    console.error('[Contact] Email error:', err.message)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

// ── Serve React app in production ─────────────────────────
if (isProd && fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
}

app.listen(isProd ? PORT : 3001, '0.0.0.0', () => {
  console.log(`API server running on port ${isProd ? PORT : 3001} (${isProd ? 'production' : 'development'})`)
})
