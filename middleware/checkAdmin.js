exports.IsAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin"){
        err = new Error("dont have permission for view this routes")
        err.statusCode = 403
        return next(err);
    }
    return next();
    
  } catch (err) {
      return next(err);
  }
}