const cluster = require('express-cluster');
const os = require('os');
const app = require ('./app');

const port = process.env.NODE_ENV === 'production' ? process.env.PACKAGER_PORT : 5500

cluster(function (worker) {
  console.log('Hello from worker worker ' + worker.id);
  return app.listen(port)
});
