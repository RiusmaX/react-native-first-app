import * as React from 'react'
import {ScrollView, Image, Text} from 'react-native'

import styles from '../Styles/NoteImagesStyle'

import {API_URL} from '../../Services/api'

const NoteImages = ({images}) => {
  return (
    <ScrollView horizontal>
      {images.map(image => (
        <Image
          style={styles.image}
          key={image.id}
          width={100}
          height={100}
          source={{ uri: `${API_URL}${image.url}` }}
        />
      ))}
    </ScrollView>
  )
}

export default NoteImages
