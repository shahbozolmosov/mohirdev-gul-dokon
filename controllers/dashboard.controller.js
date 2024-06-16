// Desc       Get dashboard home
// Route      GET /dashboard
// Access     Private
const getDashboardPage = async (req, res) => {
  try {
    const isAtuhenticated = req.session.isLogged;
    return res.render("dashboard/home", {
      title: "Dashboard",
      isAtuhenticated
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDashboardPage,
};
