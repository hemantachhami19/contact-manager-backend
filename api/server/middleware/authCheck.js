module.exports = (req, res, next) => {
  console.log(req.user,"sdfgsdfsfs");
  if (!req.user) {
    return res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
}