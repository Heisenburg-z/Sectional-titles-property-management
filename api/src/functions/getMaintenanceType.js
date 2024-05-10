const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('getMaintenanceType', {
    route: "property/staff/maintenance/{id}",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => { //wrap around try catch later

        try {
			const uid = request.params.id;

            console.log(uid);

            const account = db.collection("accounts").doc(uid); 
            const doc = await account.get();

            var maintenance;

            if (doc.exists) {
                // return { body: JSON.stringify(doc.data().maintenanceType) };
                maintenance = doc.data().maintenanceType;
                console.log(maintenance);
            } else {
                return { message: "Does not exist" };
            }

            const maintenanceType = db.collection("maintenance").where("maintenanceType", "==", maintenance); 
            const snapshot = await maintenanceType.get();

            if (snapshot.empty) {
                return { message: "No maintenance found" };
            }

            const maintenaceList = [];
            snapshot.forEach((doc) => {
                maintenaceList.push({ id: doc.id, ...doc.data() });
            });
            
            //  return { body: JSON.stringify(maintenaceList[0].maintenanceType) };
            return { body: JSON.stringify(maintenaceList) };

		} catch (error) {
			return { status: 500, body: error.message };
		}


    }
});
