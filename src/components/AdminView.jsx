/* import { useEffect, useState } from 'react'

function AdminView() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxfeG9oGKfKbpTmuyj1P5JAaoqQnmBYrXd_rEy4HJbjc8G8B8N5dRIeThSPxK2W7Hw/exec')
      .then(res => res.json())
      .then(data => {
        setEntries(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching entries:", err) 
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading entries...</p>

  return (
    <section>
      <h2>Admin Dashboard</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Total Hours</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.date}</td>
              <td>{entry.time_in}</td>
              <td>{entry.time_out}</td>
              <td>{entry.total_hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default AdminView

*/