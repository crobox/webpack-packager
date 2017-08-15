function isValidPackages(packages) {
  return packages.reduce(function (isValid, pkg) {
    if (pkg.indexOf('@') === -1) {
      return false
    }

    return isValid
  }, true)
}

module.exports = function extractPackages (req, res, next) {
  var packages = req.params['0'].split('+');
  if (!isValidPackages(packages)) {
    res.sendStatus(404);
  } else {
    req.params.packages = packages;
    next();
  }
}