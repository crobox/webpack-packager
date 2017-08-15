var exec = require('child_process').exec;

module.exports = function (packages, packagePath) {
  return new Promise(function (resolve, reject) {
    exec(`mkdir -p ${packagePath} && cd ${packagePath} && yarn add ${packages.join(' ')} --no-lockfile --ignore-scripts --non-interactive --no-bin-links --no-lockfile --ignore-engines`, function (err, stdout, stderr) {
      if (err) {
      	console.log(err);
        reject(err.message.indexOf('versions') >= 0 ? new Error('INVALID_VERSION') : err);
      } else {
      	console.log("DONE!")
        resolve();
      }
    });
  })
}
