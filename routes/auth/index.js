const express = require("express");
const authControllers = require("../../controllers/auth");
const routes = express.Router();
const authenticateUser = require("../../middlewares/authentication");

routes.post("/authenticate", authControllers.login);
routes.post("/register", authControllers.register);

module.exports = routes;