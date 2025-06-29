'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { Pencil, Trash2, Star } from 'lucide-react'

type Note = {
  id: string
  title: string
  tag: string
  content: string
  date: string
  starred: boolean
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', tag: '', content: '' })

  const notesRef = collection(db, 'notes')

  const fetchNotes = async () => {
    const snapshot = await getDocs(notesRef)
    const fetched: Note[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        tag: data.tag,
        content: data.content,
        starred: data.starred || false,
        date: data.date || new Date().toLocaleDateString(),
      }
    })
    setNotes(fetched)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleCreateNote = async () => {
    const today = new Date().toLocaleDateString()
    await addDoc(notesRef, {
      ...newNote,
      starred: false,
      date: today,
      createdAt: Timestamp.now(),
    })
    setNewNote({ title: '', tag: '', content: '' })
    setShowModal(false)
    fetchNotes()
  }

  const toggleStar = async (note: Note) => {
    const docRef = doc(db, 'notes', note.id)
    await updateDoc(docRef, { starred: !note.starred })
    fetchNotes()
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  )
  const starredNotes = filteredNotes.filter((note) => note.starred)
  const normalNotes = filteredNotes.filter((note) => !note.starred)

  const renderNoteCard = (note: Note) => (
    <div
      key={note.id}
      className={`bg-white rounded-2xl p-5 shadow border border-gray-100 transition hover:shadow-md ${
        note.starred ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <button onClick={() => toggleStar(note)}>
          <Star
            size={20}
            className={`cursor-pointer transition ${
              note.starred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      <span className="inline-block bg-purple-100 text-purple-600 text-sm px-3 py-1 rounded-full mb-3">
        {note.tag}
      </span>
      <p className="text-gray-700 text-sm mb-4">{note.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{note.date}</span>
        <div className="flex gap-3">
          <Pencil size={18} className="cursor-pointer hover:text-purple-500" />
          <Trash2 size={18} className="cursor-pointer hover:text-red-500" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-1">Study Notes</h1>
      <p className="text-gray-600 mb-6">Organize your learning with smart note-taking</p>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search your notes..."
          className="w-full max-w-xl p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowModal(true)}
          className="ml-4 px-5 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
        >
          + New Note
        </button>
      </div>

      {starredNotes.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            ⭐ Starred Notes
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {starredNotes.map(renderNoteCard)}
          </div>
        </>
      )}

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📖 All Notes
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {normalNotes.map(renderNoteCard)}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Create New Note</h2>

            <input
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full mb-3 p-2 border rounded-md"
            />
            <input
              placeholder="Tag"
              value={newNote.tag}
              onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
              className="w-full mb-3 p-2 border rounded-md"
            />
            <textarea
              placeholder="Content"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded-md h-24"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 