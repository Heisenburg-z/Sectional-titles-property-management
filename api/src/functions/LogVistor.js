const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('LogVistor', {
    methods: ['POST'],
    route: "property/resident/vistors",
    authLevel: 'anonymous',
    handler: async (request, context) => {
    const data = await request.json(); // Assuming you send the updated data in the request body

    try {
        await db.collection("visitors").add(data);
        return {
          status: 200,
          body: { message: "Visitor information added successfully." }
        };
      } catch (error) {
        return {
          status: 500,
          body: { message: "Error adding visitor information: " + error.message }
        };
      }
  },
});