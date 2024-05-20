const db = require('./firebaseDB');
const { app } = require("@azure/functions");


app.http("getNotifications", {
	route: "property/resident/dashboard/{id}",
	methods: ["GET"],
	authLevel: "anonymous",
	handler: async (request, context) => {
		const uid = request.params.id;

		console.log(uid);
		const cityRef = db.collection("notifications").doc(uid);
		const doc = await cityRef.get();
		if (doc.exists) {
			return { body: JSON.stringify(doc.data()) };
		} else {
			return { message: "Does not exist" };
		}
	}
});
