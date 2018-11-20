import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCui126U4JCzrGm29t0khIg8nH7lUfhwN4",
  authDomain: "inviteer-b6dfb.firebaseapp.com",
  databaseURL: "inviteer-b6dfb.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }

export default base;