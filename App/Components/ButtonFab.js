import * as React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import styles from './Styles/ButtonFabStyle'

const ButtonFab = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  )
}

export default ButtonFab
