const { app } = require("@azure/functions");
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceKey.json");

// admin.initializeApp(
//   {
//     credential: admin.credential.cert(serviceAccount),
//   },
//   "updateResidentProfile",
// );

const {db} = require("./firebaseDB");

app.http("updateResidentProfile", {
  route: "property/resident/profile/{id}",
  methods: ["PUT"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const uid = request.params.id;
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
  },
});
