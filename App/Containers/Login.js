import * as React from 'react'
import {View, Text, TextInput, Button} from 'react-native'

import { gql, useMutation } from '@apollo/client'

import styles from './Styles/LoginStyle'

import {darkTheme} from '../Theme/Colors'

const MUTATION_LOGIN = gql`
  mutation LoginMutation(
    $input: UsersPermissionsLoginInput!
  ) {
    login(input: $input) {
      jwt
      user {
        id
        email
      }
    }
  }
`

const Login = () => {
  const [username, setUsername] = React.useState('cacahouette72@gmail.com')
  const [password, setPassword] = React.useState('lat345at')

  const [login] = useMutation(MUTATION_LOGIN, {
    variables: {
      input: {
        identifier: username,
        password: password,
        provider: 'local'
      }
    },
    onCompleted: (result) => {
      console.log(result)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder='Saissez votre username'
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
      <Button
        title='Login'
        onPress={() => {
          console.log(`LOGIN : ${username} ${password}`)
          login()
        }}
      />
    </View>
  )
}

export default Login
