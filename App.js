/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './App/Containers/HomeScreen'
import Screen2 from './App/Containers/Screen2'

import LoginScreen from './App/Containers/Login'
import RegisterScreen from './App/Containers/Register'

import { AuthContext } from './App/Contexts/AuthContext'

const Stack = createStackNavigator()

const client = new ApolloClient({
  uri: 'https://whispering-taiga-49489.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

const App: () => React$Node = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch(action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  )

  // Equivalent à un DidMount ou un WillMount
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (error) {
        console.error(error)
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken})
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // Mise à jour de l'action SIGN_IN
        dispatch({ type: 'SIGN_IN', token: data})
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // Enregistrement d'un utilisateur
        dispatch({ type: 'SIGN_IN', token: 'fake-token'})
      }
    }),
    []
  )

  return (
  <AuthContext.Provider value={authContext}>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        {
          state.userToken
          ? (
            <Stack.Navigator>
              <Stack.Screen name='Home Screen' component={HomeScreen}/>
              <Stack.Screen name='Screen2' component={Screen2}/>
            </Stack.Navigator>
          )
          : (
            <Stack.Navigator>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </ApolloProvider>
  </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10
  }
});

export default App;
