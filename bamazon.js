//List out our npm packages
var inquirer = require("inquirer");
var mySQL = require("mysql");
require("console.table");

//Init connection with database
var connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon"

});

//creates connection with the data table
connection.connect(function (err) {
    if (err) {
        console.log(`error connecting: ${err}`);
    } loadTable();
});

//load product data or error
var loadTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            throw err;
        } else {
            //function to load the product data goes here
            console.table(res);
            itemInq(res);
        }
    })
}


//INQUIRER
var itemInq = function (inventory) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "itemID",
                message: "What is the ID of the item you want?",
                validate: function(val) {
                    return !isNaN(val)
                }
            }

        ])
        .then(function (val) {
           var choice = parseInt(val.itemID);
           var product = invCheck(choice, inventory);
           if (product) {quantityPrompt(product)}
           else {
               console.log("Not a valid ID");
               loadTable();
            }
           
        });
   
}

function quantityPrompt(product) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How many do you want?",
                validate: function (val) {
                    return val > 0
                }
            }
        ])
        .then(function (val) {
            var quantity = parseInt(val.quantity);
            

            if (quantity > product.stock_quantity) {
                console.log("Sorry! We don't have that many available ");
                loadTable();
            } else {
                //make the purchase
                purchase(product, quantity);
            }
        })
}

function purchase(product, quantity) {
    connection.query(
        //update the table with new info
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id],
        function (err, res) {
            //notify of success
            if (err) throw err;
            console.log(`Successfully purchased ${quantity} of ${product.product_name}`);
            loadTable();
        }
    )
}

function invCheck(choice, inventory) {
    for (var i = 1; i < inventory.length; i++) {
        if (inventory[i].item_id === choice) {
            return inventory[i];
        } else {
            return null;
        }
    }
}