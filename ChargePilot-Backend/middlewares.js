export function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized. Please login.",
  });
};

export function SaveRedirectUrl(req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

