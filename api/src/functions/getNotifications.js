const db = require('./firebaseDB');
const { app } = require("@azure/functions");

app.http("getNotifications", {
  route: "property/resident/dashboard",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const notificationsRef = db.collection("notifications");
      const snapshot = await notificationsRef.get();
      const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return { body: JSON.stringify(notifications) };
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return { status: 500, body: JSON.stringify({ error: 'Failed to fetch notifications' }) };
    }
  }
});
