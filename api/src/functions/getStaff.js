const {db} = require('./firebaseDB');
const { app } = require('@azure/functions');
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceKey.json");

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// }, 'getStaff');   // whenever a new initialization is created assign another description to 'getStaff' ( preferably related to the api ). Gael

// const db = admin.firestore();

app.http('getStaff', {
    route: "property/admin/staff",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const cityRef = db.collection("accounts").where("roles", "==", "Staff");
            const snapshot = await cityRef.get();

            if (snapshot.empty) {
                return { message: "No staff found" };
            }

            const staffList = [];
            snapshot.forEach(doc => {
                staffList.push({id: doc.id, ...doc.data()});
            });

            return { body: JSON.stringify(staffList) };
        } catch (error) {
            return { status: 500, body: error.message };
        }
    }
});
