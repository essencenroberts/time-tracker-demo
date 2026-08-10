import { useState } from 'react'

function TimeEntryForm() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [timeIn, setTimeIn] = useState('')
  const [timeOut, setTimeOut] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
async function handleSubmit(e) {
  e.preventDefault()

  setLoading(true)
  setError('')
  setSuccessMessage('')

  const entry = {
    name,
    date,
    timeIn,
    timeOut,
    totalHours: calculateHours(timeIn, timeOut)
  }

  try {
    const response = await fetch(
      'https://time-tracker-demo.onrender.com/api/timeentries',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }
    )

    const result = await response.json()

    if (result.success) {
      setSuccessMessage('✅Time entry submitted successfully')
      setName('')
      setDate('')
      setTimeIn('')
      setTimeOut('')
    } else {
      setError('❌ Submission failed. Please try again.')
    } 
  } catch (err) {
    console.error(err)
    setError('❌Network error. Please check your connection.')
  } finally {
    setLoading(false)
  }
}

  
function calculateHours (start,end) {
  if (!start || !end) return 0

  const startTime = new Date(`2026-02-02T${start}`)
  const endTime = new Date(`2026-02-02T${end}`)

  const diffMs = endTime - startTime
  const diffHours = diffMs / (1000 * 60 * 60)

  return diffHours
}

  return (
    <section>
      <h2>Log Hours</h2>
      
      {successMessage && (
        <p style={{ color:'green', marginBottom: '1rem' }}>
          {successMessage}
        </p>
      )}

      {loading && <p>Submitting...</p>}
      {error && <p style={{color: 'red' }}>{error}</p>}

     <form onSubmit={handleSubmit} className="time-form">
        <div className="form-group">
          <label>Employee Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Time In</label>
          <input 
            type="time"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)} 
          />
        </div>
        
         <div className="form-group">
          <label>Time Out</label>
          <input 
            type="time"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)} 
          />
        </div>


        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Time'}
        </button>
      </form>
    </section>
  ) 
}

export default TimeEntryForm