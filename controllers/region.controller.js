const { validationResult } = require("express-validator");
const db = require("../models");
const Region = db.region;

// Desc       Get region page
// Route      GET /dashboard/regions
// Access     Private
const getRegionPage = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Get regions
    const regions = await Region.findAll();

    return res.render("dashboard/region/main", {
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

// Desc       Get add a new region page
// Route      GET /dashboard/regions/add
// Access     Private
const getAddNewRegionPage = (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    return res.render("dashboard/region/add", {
      title: "Add New Region",
      isAuthenticated,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Add a new region
// Route      POST /dashboard/regions
// Access     Private
const addNewRegion = (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("dashboard/region/main", {
        title: "Regions",
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
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRegionPage,
  getAddNewRegionPage
};
