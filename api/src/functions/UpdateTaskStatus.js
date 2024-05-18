const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('UpdateTaskStatus', {
    route: "property/staff/maintenance/UpdateStatus/{id}/{status}",
    methods: ['PUT'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const uid = request.params.id;
        const uStatus = request.params.status;

        try {
            const updateStatus = db.collection("maintenance").doc(uid);
            const doc = await updateStatus.get();
            
            if (doc.exists) {
                await updateStatus.update({
                    "Status": uStatus
                });
              return { message: "Status updated successfully" };
            } else {
              return { message: "Task does not exist" };
            }
          } catch (error) {
            return { message: "Error updating status: " + error.message };
          }
    }
});

