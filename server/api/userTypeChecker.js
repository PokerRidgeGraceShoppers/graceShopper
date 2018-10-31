function isLoggedIn(req, res, next) {
  // req is meant to be req.user
  if (req.user.userType === 'regular' || req.user.userType === 'admin') {
    next()
  } else {
    res.status(401).send('Please log in before trying that.')
  }
}

function isAdmin(req, res, next) {
  // req is meant to be req.user
  if (req.user.userType === 'admin') {
    next()
  } else {
    res.status(401).send('You are not authorized to do that.')
  }
}

module.exports = {isLoggedIn, isAdmin}
