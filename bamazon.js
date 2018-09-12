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


var loadTable = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.error(`error connecting: ${err.stack}`);
        } else {
            //function to load the product data goes here
            console.table(res);
        }
    })
}

