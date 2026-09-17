import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [notes, setNotes] = useState([])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      setPhoto(null)
      return
    }
    setPhoto({ file, previewUrl: URL.createObjectURL(file) })
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setNotes((prev) => [
      {
        id: Date.now(),
        title,
        description,
        photoUrl: photo?.previewUrl ?? null,
      },
      ...prev,
    ])

    setTitle('')
    setDescription('')
    setPhoto(null)
    e.target.reset()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📓 Photo Journal</h1>
        <p>Capture a moment with a title, a note, and a picture.</p>
      </header>

      <form className="note-form" onSubmit={handleAddNote}>
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            placeholder="What's this moment called?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            placeholder="Write something about it..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>

        <label className="field">
          <span>Photo</span>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>

        {photo && (
          <div className="photo-preview">
            <img src={photo.previewUrl} alt="Preview" />
          </div>
        )}

        <button type="submit" className="add-button">
          Add Note
        </button>
      </form>

      <section className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-state">No entries yet. Add your first one above!</p>
        ) : (
          notes.map((note) => (
            <article key={note.id} className="note-card">
              {note.photoUrl && <img src={note.photoUrl} alt={note.title} />}
              <div className="note-card-body">
                <h2>{note.title}</h2>
                {note.description && <p>{note.description}</p>}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  )
}

export default App
