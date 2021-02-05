import * as React from 'react'
import { RefreshControl, ScrollView, View, Text } from 'react-native';

import Note from './Note'

import styles from '../Styles/NotesListStyle'

const NotesList = ({ notes, getNotes }) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    const refresh = async () => {
      notes = await getNotes()
    }
    refresh()
    setRefreshing(false)
  })
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          notes
            ? (
              notes.map(note =>
                <Note key={note.id} note={note} />
              )
            )
            : <Text>Aucune note</Text>
        }
      </ScrollView>
    </View>
  )
}

export default NotesList
