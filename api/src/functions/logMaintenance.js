const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('logMaintenance', {
    methods: ['POST'],
    route: "property/resident/maintenance",
    authLevel: 'anonymous',
    handler: async (request, context) => {
    const data = await request.json(); // Assuming you send the updated data in the request body

    try {
        db.collection("maintenance").add(data);
    } catch (error) {
      return { message: "Error adding maintenance issue: " + error.message };
    }
  },
});
