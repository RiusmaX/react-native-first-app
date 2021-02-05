import { StyleSheet } from 'react-native'
import { darkTheme } from '../../Theme/Colors'

export default StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: darkTheme.background,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  title: {
    color: darkTheme.text,
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    color: darkTheme.text,
    fontSize: 14,
  }
})
