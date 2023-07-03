const path = require("path");
const express = require('express');
const cookieParser = require('cookie-parser');


function expressConfig(app) {
  app.use(express.static(path.resolve(__dirname, '../static')));
  app.use(express.urlencoded({extended: false}))
  app.use(cookieParser());

}

module.exports = expressConfig;