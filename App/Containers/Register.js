import * as React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthContext } from '../Contexts/AuthContext'

import { gql, useMutation } from '@apollo/client'

import styles from './Styles/LoginStyle'

import { darkTheme } from '../Theme/Colors'

const MUTATION_REGISTER = gql`
  mutation register(
    $email: String!, $username: String!, $password: String!
  ) {
    register(input: {email: $email, username: $username, password: $password}) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`
const storeToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token)
  } catch (error) {
    console.error(error)
  }
}

const Register = () => {
  const [email, setEmail] = React.useState('test@gmail.com')
  const [username, setUsername] = React.useState('TestUser')
  const [password, setPassword] = React.useState('password')

  const { signUp } = React.useContext(AuthContext);

  const [register] = useMutation(MUTATION_REGISTER, {
    variables: {
      email: email,
      username: username,
      password: password
    },
    onCompleted: async (result) => {
      await storeToken(result.register.jwt)
      signUp(result.register)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder='Saissez votre username'
        placeholderTextColor={darkTheme.text}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder='Saissez votre email'
        placeholderTextColor={darkTheme.text}
      />
      <TextInput
        secureTextEntry
        style={styles.textInput}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder='Saissez votre mot de passe'
        placeholderTextColor={darkTheme.text}
      />
      <Button title='Register' onPress={() => { register() }} />
    </View>
  )
}

export default Register
