//Function to retrieve userData from AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getUserFromStorage = async () => {
  const userData = await AsyncStorage.getItem('userData')

  return userData
}

export const getPeriod = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' y'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' m'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' d'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' h'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' mn'
  }
  return Math.floor(seconds) + ' s'
}
