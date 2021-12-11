import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCwq6O8Feso82Tw6IISA5oS8ZDYZc71CGE',
  authDomain: 'remotehub-b7234.firebaseapp.com',
  projectId: 'remotehub-b7234',
  storageBucket: 'remotehub-b7234.appspot.com',
  messagingSenderId: '984400496819',
  appId: '1:984400496819:web:cbf0547917ccfa785f88c6',
}
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth }
