
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteBikerLocations = functions.database.ref('/{bikerId}/current_booking')
    .onWrite((change, context) =>{
        // console.log(change)
        // console.log(context)
        if (context.authType === 'ADMIN') {

            const newValue = change.after.val();
            const oldValue = change.before.val();
            
            if(oldValue.booking_id !== newValue.booking_id){
                const bikerId = context.params.bikerId;
                var ref = admin.database().ref('/' + bikerId + '/locations');
                return ref.remove()
                    .then(() => {
                        return "Delete success :)";
                    })
                    .catch( (error) => {
                        // console.log("delete failed :( " + error.message)
                        return "delete failed :( " + error.message;
                      });
            }else{
                return "No changes in booking_id";
            }

        }else{
            return "Not Admin";
        }
    });