'use client'
import { Button } from '@mui/material'
import Image from 'next/image'
import Map from './Map'
import { useState } from 'react'

export default function Home() {
  const [isEditing, setEditing] = useState(false);
  const [mode, setMode] = useState('allowed');

  function toggleEditing(selectedMode: string) {
    return function() {
      setMode(selectedMode);
      setEditing(prevEditing => !prevEditing);
    }
  }

  return (
    <main className="relative h-full w-full">
      <div className="absolute w-full top-0 left-0 p-4 z-10">
        <Button onClick={toggleEditing('allowed')} variant="contained">
          { isEditing && mode === 'allowed' ? 'Stop Editing' : 'Start Editing Allowed' }
        </Button>
        <Button onClick={toggleEditing('denied')} variant="contained">
          { isEditing && mode === 'denied' ? 'Stop Editing' : 'Start Editing Denied' }
        </Button>
      </div>
      <Map editable={isEditing} mode={mode} />
    </main>
  )
}
