import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'videos.json')

const app = express()
app.use(cors())
app.use(express.json())

const ADMIN_PIN = process.env.ADMIN_PIN || '2025'

function readVideos() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function writeVideos(videos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2))
}

// GET all videos
app.get('/api/videos', (req, res) => {
  const videos = readVideos()
  const { category } = req.query
  const result = category && category !== 'All'
    ? videos.filter(v => v.category === category)
    : videos
  res.json(result)
})

// POST add video (requires pin)
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

// DELETE video (requires pin)
app.delete('/api/videos/:id', (req, res) => {
  const { pin } = req.body
  if (pin !== ADMIN_PIN) return res.status(401).json({ error: 'Invalid PIN' })
  const videos = readVideos()
  const updated = videos.filter(v => v.id !== req.params.id)
  if (updated.length === videos.length) return res.status(404).json({ error: 'Video not found' })
  writeVideos(updated)
  res.json({ success: true })
})

// Auth check
app.post('/api/auth', (req, res) => {
  const { pin } = req.body
  res.json({ valid: pin === ADMIN_PIN })
})

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
