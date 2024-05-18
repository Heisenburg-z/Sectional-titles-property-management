const db = require('./firebaseDB');
const { app } = require('@azure/functions');

app.http('UpdateStaffRole', {
    route: "property/admin/staff/updaterole/{id}",
    methods: ['PATCH'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { id } = request.params;
        const { newRole } = await request.json();

        try {
            const staffRef = db.collection("accounts").doc(id);
            await staffRef.update({maintenanceType: newRole });
            return {
                status: 200,
                body: JSON.stringify({message: "Role updated successfully"})
            }
        } catch (error) {
            console.error("Error updating role: ", error);
            return {
                status: 500,
                body: JSON.stringify({message: "Error updating role"})
            }
        }
    }
})