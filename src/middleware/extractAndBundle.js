var path = require('path');
var extract = require('../extract');
var utils = require('../utils');
var exec = require('child_process').exec;
var verifyAvailability = require('./verifyAvailability');
var tarball = new require('tar.gz')({}, {
        fromBase: true // do not include top level directory
      });
var eos = require('end-of-stream');

function extractAndBundle (req, res) {
  var packages = req.params.packages;
  var packagePath = `packages/${utils.getHash(packages)}`;
  var currentTime = Date.now()

  verifyAvailability.isAvailable = false;
  console.log('Started - ' + packages.join(', ') + ' - ' + new Date(currentTime))
  return extract(packages, packagePath)
    .then(function () {
      console.log('Success - ' + utils.getDuration(currentTime)  + 's')
      currentTime = Date.now()

      var read = tarball.createReadStream(packagePath)
      var stream = read.pipe(res);

      eos(stream, function(err) {
        if (err) {
          console.error(err);
        }
        exec(`rm -rf ${packagePath}`, function (err, stdout, stderr) {
          if (err) {
            console.error(err);
          }
          verifyAvailability.isAvailable = true;
          console.log('Cleaned - ' + utils.getDuration(currentTime)  + 's')
        })
      })
    })
    .catch(function (error) {
      console.error('Error - ' + error.message + ' - ' + utils.getDuration(currentTime) + 's')
      console.error(error.stack);
      currentTime = Date.now()

      verifyAvailability.isAvailable = true;
      res.status(500).send({ error: error.message });

      var stats = fs.lstatSync(packagePath);
      if (stats.isDirectory()) {
        exec(`rm -rf ${packagePath}`, function (err, stdout, stderr) {
          if (err) {
            console.log(err);
          }
          console.log('Cleaned - ' + utils.getDuration(currentTime)  + 's')
        })
      }
    });
}

module.exports = extractAndBundle;
