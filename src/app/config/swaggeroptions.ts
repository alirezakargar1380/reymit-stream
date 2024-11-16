export default {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "MyCamp Api Documentation",
            description: "This is the main api documentation for MyCamp project",
            contact: {
                name: "info@mycamp.ir"
            },
            servers: [
                process.env.MAIN_WEBSITE_URL
            ]
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'authorization',
                scheme: 'bearer',
                in: 'header',
            },
        }
    },
    apis: [
        "src/app/routes/*.ts",
        "src/app/routes/tools/new_event_alert/new_donation_alert/*.ts",
        "src/app/routes/tools/new_event_alert/new_donation_alert/condition/*.ts",
        "src/app/routes/tools/new_event_alert/target/*.ts",
        "src/app/routes/tools/*.ts",
    ]
};