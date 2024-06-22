// Desc       Get dashboard home
// Route      GET /dashboard
// Access     Private
const getProductsPage = async (req, res) => {
  try {
    const isAtuhenticated = req.session.isLogged;
    return res.render("dashboard/products/main", {
      title: "Products",
      breadcrumb:[
        {
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          label: "Products",
          route: "/dashboard/products",
          active: true
        },
      ],
      isAtuhenticated
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsPage,
};
