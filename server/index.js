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

    // Notification email to Christian
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: 'christianirasubizashema@gmail.com',
      replyTo: email,
      subject: `📩 New message from ${name} — Portfolio`,
      html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:12px"><h2 style="color:#1d4ed8;margin-top:0">New message via your portfolio</h2><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;color:#555;font-weight:600;width:80px">Name</td><td style="padding:8px 0">${name}</td></tr><tr><td style="padding:8px 0;color:#555;font-weight:600">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr></table><hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/><p style="color:#111;white-space:pre-wrap;line-height:1.7">${message}</p></div>`,
    })

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Christian Shema" <${GMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 🙌`,
      html: `
        <div style="font-family:'Inter',sans-serif;max-width:540px;margin:0 auto;background:#070d1b;color:#e2e8f0;padding:0;border-radius:16px;overflow:hidden">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#1d4ed8,#4f46e5);padding:36px 32px;text-align:center">
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.5px">Message Received ✅</h1>
            <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:14px">Thanks for getting in touch, ${name}!</p>
          </div>
          <!-- Body -->
          <div style="padding:32px">
            <p style="margin:0 0 16px;line-height:1.75;color:#cbd5e1">Hey <strong style="color:#fff">${name}</strong>,</p>
            <p style="margin:0 0 16px;line-height:1.75;color:#cbd5e1">
              I received your message and I'll get back to you within <strong style="color:#60a5fa">24–48 hours</strong>.
              I read every message personally and look forward to learning more about your project.
            </p>
            <!-- Message preview box -->
            <div style="background:#0f172a;border:1px solid #1e3a5f;border-radius:10px;padding:16px 20px;margin:24px 0">
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#64748b">Your message</p>
              <p style="margin:0;line-height:1.7;color:#94a3b8;white-space:pre-wrap;font-size:14px">${message}</p>
            </div>
            <p style="margin:0 0 24px;line-height:1.75;color:#cbd5e1">
              While you wait, feel free to explore my work at
              <a href="https://christian-shema-dev.replit.app" style="color:#60a5fa;text-decoration:none">christian-shema-dev.replit.app</a>.
            </p>
            <!-- CTA -->
            <div style="text-align:center;margin:28px 0">
              <a href="https://christian-shema-dev.replit.app/#projects" style="display:inline-block;padding:12px 28px;background:#1d4ed8;color:#fff;font-weight:700;font-size:14px;border-radius:10px;text-decoration:none">View My Projects →</a>
            </div>
          </div>
          <!-- Footer -->
          <div style="padding:20px 32px;border-top:1px solid #1e293b;text-align:center">
            <p style="margin:0;font-size:12px;color:#475569">
              Christian Shema · Full-Stack Developer · Rwanda
            </p>
            <p style="margin:6px 0 0;font-size:11px;color:#334155;font-style:italic">Code with Purpose. Build for His Glory.</p>
          </div>
        </div>
      `,
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
