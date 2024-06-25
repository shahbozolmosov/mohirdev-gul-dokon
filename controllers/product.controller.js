// Desc       Get dashboard products page
// Route      GET /dashboard/products
// Access     Private
const getProductsPage = async (req, res) => {
  try {
    const isAtuhenticated = req.session.isLogged;
    return res.render("dashboard/products/main", {
      title: "Products",
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
          active: true,
        },
      ],
      isAtuhenticated,
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Get dashboard products add page
// Route      GET /dashboard/products/add
// Access     Private
const getProductsAddPage = async (req, res) => {
  try {
    const isAtuhenticated = req.session.isLogged;
    return res.render("dashboard/products/add", {
      title: "Product Add",
      breadcrumb: [
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
        },
        {
          label: "Product Add",
          route: "/dashboard/products/add",
          active: true,
        },
      ],
      isAtuhenticated,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsPage,
  getProductsAddPage,
};
