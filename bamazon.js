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

//creates connection with the data table
connection.connect(function(err) {
if (err) {
    console.log(`error connecting: ${err}`);
} loadTable();
});

//load product data or error
var loadTable = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            throw err;
        } else {
            //function to load the product data goes here
            console.table(res);
        }
    })
}


