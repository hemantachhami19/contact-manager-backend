import Util from "../utils/Utils";
const util = new Util();
module.exports = (req, res, next) => {
  if (!req.user) {
    console.log("fsfsfs");
    util.setError(401, 'unauthorised access!!');
    return util.send(res);
  } else {
    next();
  }
}