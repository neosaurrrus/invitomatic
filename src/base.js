import Rebase from "re-base"
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "something",
    authDomain: "inviteer-b6dfb.firebaseapp.com",
    databaseURL: "https://inviteer-b6dfb.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

export {firebaseApp}
export default base;
