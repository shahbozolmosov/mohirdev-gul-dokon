const db = require("../models");
const Region = db.region;

// Desc       Get region page
// Route      GET /dashboard/region
// Access     Private
const getRegionPage = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Get regions
    const regions = await Region.findAll();

    return res.render("dashboard/region/region", {
      title: "Regions",
      isAuthenticated,
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Regions",
          route: "/dashboard/regions",
          active: true,
        },
      ],
      regions,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRegionPage,
};
