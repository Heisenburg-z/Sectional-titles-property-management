const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('getVistors', {
    route: "property/resident/allvistors",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const query = new URLSearchParams(request.query);
        const residentEmail = query.get('residentEmail');

        if(!residentEmail) {
            return { status: 400, body: "Missing residentEmail query parameter"};
        }

        try {
            const vistorRef = db.collection("visitors").where("residentEmail", "==", residentEmail);
            const snapshot = await vistorRef.get();

            if(snapshot.empty) {
                return { message: "No vistors found for the given resident"}
            }

            const vistorList = [];
            snapshot.forEach(doc => {
                vistorList.push({id: doc.id, ...doc.data()});
            });

            return { body: JSON.stringify(vistorList)};

        } 
        catch(error) {
            return { status: 500, body: error.message };
        }
    }
})