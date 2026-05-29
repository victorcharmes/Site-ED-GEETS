import { useEffect, useState } from 'react'
import { useAdmin } from '../context/AdminContext'

export function useEditableText(key, fallback) {
  const [text, setText] = useState(fallback)
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const { token } = useAdmin()

  useEffect(() => {
    fetch('/api/site-texts')
      .then(r => r.json())
      .then(data => { if (data[key]) setText(data[key]) })
      .catch(() => {})
  }, [key])

  const startEdit = () => {
    setEditValue(text)
    setEditing(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/site-texts/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ value: editValue }),
      })
      if (res.ok) {
        setText(editValue.trim())
        setEditing(false)
      }
    } finally {
      setSaving(false)
    }
  }

  return { text, editing, editValue, setEditValue, startEdit, save, saving, cancelEdit: () => setEditing(false) }
}
