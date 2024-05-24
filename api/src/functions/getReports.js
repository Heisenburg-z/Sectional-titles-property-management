const {db} = require("./firebaseDB");

const { app } = require("@azure/functions");

app.http("getReports", {
	route: "property/resident/reports/{id}",
	methods: ["GET"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		try {
			const uid = request.params.id;

			const AdminRef = db.collection("maintenance").where("userId", "==", uid);
			const snapshot = await AdminRef.get();

			if (snapshot.empty) {
				return { message: "No Admin found" };
			}

			const reportList = [];
			snapshot.forEach((doc) => {
				reportList.push({ id: doc.id, ...doc.data() });
			});

			return { body: JSON.stringify(reportList) };
		} catch (error) {
			return { status: 500, body: error.message };
		}
	},
});
