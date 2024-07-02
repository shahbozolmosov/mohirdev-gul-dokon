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
const addNewRegion = async (req, res) => {
  try {
    // Authenticated
    const isAuthenticated = req.session.isLogged;

    // Body request
    const { name } = req.body;

    // Errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("dashboard/region/add", {
        title: "Add New Region",
        isAuthenticated,
        errorMessage: errors.array()[0].msg,
        oldInput: {
          name,
        },
      });
    }

    // Create a new region
    await Region.create({
      name,
    });

    return res.redirect('/dashboard/regions')
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRegionPage,
  getAddNewRegionPage,
  addNewRegion,
};
