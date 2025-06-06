const bcrypt = require("bcrypt");
const User = require("../models/User");
const Cart = require("../models/Cart");
const { generate } = require("../helpers/token");

// register

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ login, password: passwordHash });
    const token = generate({ id: user.id });
    return { user, token };
  } catch (error) {    
    if (error.name === "MongoServerError" && error.code === 11000) {      
      throw new Error("Такой логин уже существует.");
    } else {
      throw new Error(error);
    }
  }
}

// login

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  await user.populate({
    path: "cart",
    populate: {
      path: "items",
      populate: "product",
    },
  });

  return { token, user };
}

module.exports = {
  register,
  login,
};
