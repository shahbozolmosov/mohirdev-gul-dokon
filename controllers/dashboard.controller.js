// Desc       Get dashboard home
// Route      GET /dashboard
// Access     Private
const getDashboardPage = async (req, res) => {
  try {
    return res.render("dashboard/home", {
      title: "Dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDashboardPage,
};
