const {db }= require('./firebaseDB');  //use this when creating a new api
const { app } = require('@azure/functions');

app.http('DeleteResident', {
    route:"property/admin/resident/delete/{id}",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const uid = request.params.id;

        const cityRef = db.collection("accounts").doc(uid).delete().then(() => {
            // console.log("Document successfully deleted!");
            return { message: "Document successfully deleted!" };
        }).catch((error) => {
            // console.error("Error removing document: ", error);
            return { message: "Does not exist" };
        });

    }
});
