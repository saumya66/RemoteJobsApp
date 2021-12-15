//Function to retrieve userData from AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getUserFromStorage = async () => {
  const userData = await AsyncStorage.getItem('userData')

  return userData
}
