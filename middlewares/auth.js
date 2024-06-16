const protected = (req, res, next) => {
  if (!req.session.isLogged) {
    res.redirect("/auth/login");
  }

  next();
};

const guest = (req, res, next) => {
  if (req.session.isLogged) {
    res.redirect("/dashboard");
  }

  next();
};

module.exports = {
  protected,
  guest,
};
