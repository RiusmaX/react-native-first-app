import * as React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';

const API_URL = 'http://localhost:1337'

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken')
    return token
  } catch (error) {
    console.log(error)
    return null
  }
}

const getNotes = async () => {
  const token = await getToken()
  if (token) {
    try {
      const response = await axios(`${API_URL}/notes`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

const createNote = async (note) => {
  const token = await getToken()
  if (token) {
    try {
      const response = await axios(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: JSON.stringify(note)
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = {
  API_URL,
  getNotes,
  createNote
}
