import mongoose from 'mongoose'

const timeEntrySchema = new mongoose.Schema({
  name: { type: String, required: true},
  date: { type: String, required: true},
  timeIn: { type: String, required: true },
  timeOut: { type: String, required: true },
  totalHours: { type: Number, required: true }
  }, { timestamps: true
})

export default mongoose.model('TimeEntry', timeEntrySchema)