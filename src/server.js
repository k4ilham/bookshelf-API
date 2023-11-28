const Hapi = require('@hapi/hapi');
const routes = require('./routes/index');
const host = 'localhost';
const port = 9000;
const init = async () => {
  const server = Hapi.server({
    port: port, // Port where the server is running
    host: host, // Server host
    routes: {
      cors: {
        origin: ['*'], // CORS setting to allow access from all origins (use with caution in a production environment)
      },
    },
  });

  // Adding routes to the server
  server.route(routes);

  // Starting the server
  await server.start();
  console.log(`Running on ${server.info.uri}`);
};

// Calling the initialization function to run the server
init();
