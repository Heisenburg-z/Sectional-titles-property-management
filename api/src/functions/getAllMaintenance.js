const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('getAllMaintenance', {
    route: "property/admin/allmaintenance",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const maintenance = db.collection("maintenance");
            const snapshot = await maintenance.get();

            if (snapshot.empty) {
                return { message: "No maintenances found" };
            }

            const maintenanceList = [];
            snapshot.forEach(doc => {
                maintenanceList.push({id: doc.id, ...doc.data()});
            });

            return { body: JSON.stringify(maintenanceList) };
        } catch (error) {
            return { status: 500, body: error.message };
        }
    }
});
