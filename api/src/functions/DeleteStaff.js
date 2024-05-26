const {db} = require('./firebaseDB');  //use this when creating a new api
const { app } = require('@azure/functions');

app.http('DeleteStaff', {
    route:"property/admin/staff/delete/{id}",
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const uid = request.params.id;

        const cityRef = db.collection("accounts").doc(uid).delete().then(() => {
            return { message: "Document successfully deleted!" };
        }).catch((error) => {
            return { message: "Does not exist" };
        });

    }
});
