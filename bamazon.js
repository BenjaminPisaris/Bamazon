//List out our npm packages
var inquirer = require("inquirer");
var mySQL = require("mysql");
require("console.variable");

//Init connection with database
var connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
});

//load product data or error
if (err) {
    console.error(`error connecting: ${err.stack}`);
} else {
    //function to load the product data goes here
}

