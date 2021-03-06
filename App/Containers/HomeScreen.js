import * as React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../Contexts/AuthContext'

function HomeScreen ({ navigation }) {
  const { signOut, state } = React.useContext(AuthContext)

  const logout = async () => {
    try {
      await AsyncStorage.clear()
      signOut()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Yo {state && state.user ? state.user.username : 'null'} !!</Text>
      <Button
        title='Go to NotesScreen'
        onPress={() => navigation.navigate('NotesScreen')} />
      <Button
        title='Logout'
        onPress={() => logout()} />
    </View>
  );
}

export default HomeScreen
