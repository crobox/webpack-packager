var fs = require('fs');
var hash = require('string-hash');
var path = require('path');

module.exports = {
  getHash: function (packages) {
    if (!packages || Object.keys(packages).length === 0) {
      return null;
    }
    var packagesList = Object.keys(packages).map(function (key) {
      return key + ':' + packages[key];
    }).sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return String(hash(JSON.stringify(packagesList)));
  },
  readFile: function (path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf-8', function (error, content) {
          if (error) {
            reject(error);
          } else {
            resolve(content);
          }
      });
    });
  },
  writeFile: function (path, content) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(path, content, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
      });
    });
  },
  readDir: function (path) {
    return new Promise(function (resolve, reject) {
      fs.readdir(path, function (error, dir) {
          if (error) {
            reject(error);
          } else {
            resolve(dir);
          }
      });
    });
  },
  stat: function (path) {
    return new Promise(function (resolve, reject) {
      fs.stat(path, function (error, stat) {
          if (error) {
            reject(error);
          } else {
            resolve(stat);
          }
      });
    });
  },

  getDuration: function (time) {
    return (Date.now() - time) / 1000
  }
}
