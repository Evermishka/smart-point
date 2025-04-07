const mapCart = require("../helpers/mapCart");

module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    registeredAt: user.createdAt,
    cart: user.cart ? mapCart(user.cart) : []
  };
};
