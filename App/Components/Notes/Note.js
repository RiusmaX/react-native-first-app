import * as React from 'react'
import { View, Text } from 'react-native'

import styles from '../Styles/NoteStyle'
import NoteImages from './NotesImages'

const getExtract = (string, nbChar = 200) => {
  return string.length > nbChar
    ? string.substring(0, nbChar).concat('...')
    : string
}

const Note = ({ note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content}>{getExtract(note.content)}</Text>
      </View>
      <NoteImages images={note.images} />
    </View>
  )
}

export default Note
