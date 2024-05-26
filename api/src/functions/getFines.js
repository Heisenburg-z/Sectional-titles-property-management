const {db} = require('./firebaseDB');

const { app } = require('@azure/functions');

app.http("getFines", {
	route: "property/resident/fines/{id}",
	methods: ["GET"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		try {
            const uid = request.params.id;

			const AdminRef = db.collection("fines").where("userId", "==", uid);
			const snapshot = await AdminRef.get();

			if (snapshot.empty) {
				return { message: "No Admin found" };
			}

			const fineList = [];
			snapshot.forEach((doc) => {
				fineList.push({ id: doc.id, ...doc.data() });
			});

			return { body: JSON.stringify(fineList) };
		} catch (error) {
			return { status: 500, body: error.message };
		}
	}
});