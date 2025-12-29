export default function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Plz login to add listing.");
    return res.redirect("/login");
  }
  next();
}

export function SaveRedirectUrl(req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}
