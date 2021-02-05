import * as React from 'react'
import { View, Text } from 'react-native'
import { getNotes } from '../Services/api'

import NotesList from '../Components/Notes/NotesList'
import ButtonFab from '../Components/ButtonFab'

function NotesScreen () {
  const [data, setData] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotes()
      setData(notes)
    }

    fetchData()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NotesList notes={data} getNotes={getNotes} />
      <ButtonFab />
    </View>
  )
}

export default NotesScreen
