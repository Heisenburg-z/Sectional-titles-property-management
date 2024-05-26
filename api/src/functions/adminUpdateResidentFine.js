const { app } = require("@azure/functions");
const {db} = require("./firebaseDB");

app.http("adminUpdateResidentFine", {
  route: "property/admin/resident/{residentId}/fine/update",
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const fineId = request.params.residentId;
    const data = await request.json(); // Assuming you send the updated data in the request body
    db.collection("fines").doc(fineId).update(data);
  },
});
