import * as React from 'react'
import { View, Text, Modal, Button, TextInput } from 'react-native'
import { getNotes, createNote } from '../Services/api'

import NotesList from '../Components/Notes/NotesList'
import ButtonFab from '../Components/ButtonFab'

// TODO: Faire l'équivalent en GraphQL

function NotesScreen () {
  const [data, setData] = React.useState('')
  const [modalVisible, setModalVisible] = React.useState(false)
  const [title, setTitle] = React.useState('Ma note ajoutée')
  const [content, setContent] = React.useState('Ma super note ajoutée')

  React.useEffect(() => {
    const fetchData = async () => {
      const notes = await getNotes()
      setData(notes)
    }

    fetchData()
  }, [])

  const addNote = () => {
    if (title && content) {
      createNote({
        title: title,
        content: content
      })
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NotesList notes={data} getNotes={getNotes} />
      <ButtonFab onPress={() => setModalVisible(true)} />
      <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <Button title='Fermer' onPress={() => setModalVisible(false)} />
        <Text>AJOUTER UNE NOTE</Text>
        <TextInput
          placeholder='Titre'
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          placeholder='Contenu'
          multiline
          numberOfLines={10}
          value={content}
          onChangeText={text => setContent(text)}
        />
        <Button title='Ajouter la note' onPress={addNote} />
      </Modal>
    </View>
  )
}

export default NotesScreen
