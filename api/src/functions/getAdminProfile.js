const {db} = require("./firebaseDB");
const { app } = require("@azure/functions");

app.http("getAdminProfile", {
	route: "property/admin/profile/{id}",
	methods: ["GET", "PUT"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		const uid = request.params.id;
		const requestType = request.method;

		if (requestType === "GET") {
			console.log(uid);
			const cityRef = db.collection("accounts").doc(uid);
			const doc = await cityRef.get();
			if (doc.exists) {
				return { body: JSON.stringify(doc.data()) };
			} else {
				return { message: "Does not exist" };
			}
		} else if (requestType === "PUT") {
			const newData = await request.json(); // Assuming you send the updated data in the request body
			try {
				const cityRef = db.collection("accounts").doc(uid);
				const doc = await cityRef.get();
				if (doc.exists) {
					await cityRef.update(newData);
					return { message: "Profile updated successfully" };
				} else {
					return { message: "Resident does not exist" };
				}
			} catch (error) {
				return { message: "Error updating profile: " + error.message };
			}
		}
	},
});
