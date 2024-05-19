const { app } = require("@azure/functions");
const db = require("./firebaseDB");
app.http("AdminNewFine", {
  route: "property/admin/resident/{id}/fine/newfine",
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const residentId = request.params.id;
    console.log(residentId);
    const data = await request.json(); // Assuming you send the updated data in the request body
    db.collection("fines").add(data);
  },
});
