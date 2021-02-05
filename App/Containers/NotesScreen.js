import * as React from 'react'
import { View, Text } from 'react-native'
import { getNotes } from '../Services/api'

import NotesList from '../Components/Notes/NotesList'

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
    </View>
  );
}

export default NotesScreen
