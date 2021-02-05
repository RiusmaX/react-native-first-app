import * as React from 'react'
import { View, Text } from 'react-native'

import styles from '../Styles/NoteStyle'

const getExtract = (string, nbChar = 200) => {
  return string.length > nbChar
    ? string.substring(0, nbChar).concat('...')
    : string
}

const Note = ({ note }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{getExtract(note.content)}</Text>
    </View>
  )
}

export default Note
