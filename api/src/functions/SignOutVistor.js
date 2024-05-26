const {db} = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('SignOutVistor', {
    route: "property/admin/resident/deletevisitor/{id}",
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const uid = request.params.id;

        try {
            await db.collection("visitors").doc(uid).delete();
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: "Visitor successfully deleted!"})
            };
        } catch (error) {
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: "Error removing document: " + error.message })
            };
        }
    }
});