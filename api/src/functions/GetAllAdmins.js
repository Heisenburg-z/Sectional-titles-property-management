const { app } = require("@azure/functions");
const db = require("./firebaseDB");

app.http("GetAllAdmins", {
	route: "property/admin/admins",
	methods: ["GET"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		try {
			const AdminRef = db.collection("accounts").where("roles", "==", "Admin");
			const snapshot = await AdminRef.get();

			if (snapshot.empty) {
				return { message: "No Admin found" };
			}

			const adminList = [];
			snapshot.forEach((doc) => {
				adminList.push({ id: doc.id, ...doc.data() });
			});

			return { body: JSON.stringify(adminList) };
		} catch (error) {
			return { status: 500, body: error.message };
		}
	},
});
