const { app } = require("@azure/functions");
const db = require("./firebaseDB");
app.http("GetAllFines", {
	route: "property/admin/fines/all",
	methods: ["GET", "POST"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		try {
			const AdminRef = db.collection("fines");
			const snapshot = await AdminRef.get();

			if (snapshot.empty) {
				return { message: "No fines" };
			}

			const finesList = [];
			snapshot.forEach((doc) => {
				finesList.push({ id: doc.id, ...doc.data() });
			});

			return { body: JSON.stringify(finesList) };
		} catch (error) {
			return { status: 500, body: error.message };
		}
	},
});
