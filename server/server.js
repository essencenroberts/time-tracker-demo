import express from 'express' 
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import TimeEntry from'./models/TimeEntry.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err)
  )

  app.post('/api/timeentries', async (req, res) => {
    try {
      const entry = new TimeEntry(req.body)
      await entry.save()
      res.json({ success:true, entry })
    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, error: 'Failed to save entry' })
    }
  })

  app.get('/api/timeentries', async (req, res) => {
    try {
      const entries = await TimeEntry.find().sort({ createdAt: -1 })
      res.json(entries)
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch entries' })
    }
  })

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))