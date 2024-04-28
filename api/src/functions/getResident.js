const { app } = require('@azure/functions');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
}, 'getResident');   // whenever a new initialization is created assign another description to 'getStaff' ( preferably related to the api ). Gael

const db = admin.firestore();

app.http('getResident', {
    route: "property/admin/resident",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const cityRef = db.collection("accounts").where("roles", "==", "Resident");
            const snapshot = await cityRef.get();

            if (snapshot.empty) {
                return { message: "No resident found" };
            }

            const staffList = [];
            snapshot.forEach(doc => {
                staffList.push(doc.data());
            });

            return { body: JSON.stringify(staffList) };
        } catch (error) {
            return { status: 500, body: error.message };
        }
    }
});
