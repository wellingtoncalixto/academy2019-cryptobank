const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();

const firestore = admin.firestore()

const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

exports.create_user = functions.auth.user().onCreate((user) => {
  const {uid, email, saldo = 0} = user
  return firestore.doc(`users/${uid}`).set({uid, email, saldo})
})