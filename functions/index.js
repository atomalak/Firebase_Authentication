const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);


exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: 'Success ' + data.email + "has been made an admin"
        }
    }).catch((err) => {
        return err;
    })
});

exports.getTodoList = functions.https.onRequest((request, response) => {
    const promise = admin.firestore().collection("/todos").doc("1xy7Fb3S57wxLxRxKz19").get();
    const p2 = promise.then(snaphot => {
        const data = snaphot.data();
        response.send({ status: "success", "data": data });
        return data;
    })
    p2.catch((err) => {
        response.status(500).send({ status: "failed", "error": err })
        return err;
    })
})

exports.triggerAnyTodoItem = functions.firestore.document("/todos/{todoId}").onCreate((snaphot, context) => {
    const newValue = snaphot.data();
    console.log(newValue);
    return admin.firestore().collection("/todos").doc(context.params.todoId).update({ "item": newValue.item.toUpperCase() })
})