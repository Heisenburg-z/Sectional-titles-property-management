const { app } = require('@azure/functions');
// This is just a sample file created by AutumnLeaf you can delete it but also use it for references
// add the routes property too
app.http('SampleFunction', {
    route: 'getWhatever',
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});
