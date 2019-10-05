var mysql = require("mysql");
var inquirer = require("inquirer");
var totalCost = 0;

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: "root",
    password: "rootroot",
    database: "bamazonDB"
});

//create connection with server and load product data
connection.connect(function (err) {

    if (err) {
        console.log("error connect".err.stack)
    }
});
loadProducts()

//function to load products from db
function loadProducts() {
    connection.query("SELECT item_id, product_name, department_name, price FROM products", function (err, res) {
        if (err) throw err

        //display items in a table
        console.table(res);

        //then prompt the customer to choice of item
        promptCustomerOrder(res)
    });
}

//prompt the customer for a product id and quantity
function promptCustomerOrder() {
    return inquirer.prompt([{
        name: "itemId",
        message: "Please enter the id of the item you would like to purchase.",
        type: "input",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("Please enter valid item id");
                return false;
            }
        }
    }, {
        name: "quantity",
        message: "How many would you like to buy?",
        type: "input",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
        }
        //link user answer to db table    
    }]).then(function (answer) {
        connection.query("SELECT  * FROM products WHERE ?",
            { item_id: answer.itemId }, function (err, res) {

                if (err) throw err;
                //check for sufficient quantity for order, and option to reorder if quantity desired not available 
                if (answer.quantity > res[0].stock_quantity) {
                    inquirer
                        .prompt([
                            {
                                name: "orderAgain",
                                type: "input",
                                message: "Sorry, insufficient quantity in stock to fulfill your order. Would you like to place another order?"
                            }
                            //option to quit for user if they don't want to adjust order.
                        ]).then(function (answer) {
                            if (answer.orderAgain == "yes") {
                                promptCustomerOrder();
                            } else if (totalCost >= 0) {
                                console.log("Okay, thanks for visiting and come back soon!");
                                connection.end();
                            }
                        });
                }
                //total cost or order and adjust quantity to db for item_id
                else {
                    totalCost = totalCost + res[0].price * answer.quantity;
                    var newQuantity = res[0].stock_quantity - answer.quantity;
                    connection.query(`UPDATE products SET stock_quantity=${newQuantity} WHERE item_id = ${answer.itemId}`, function (res) {
                        {
                            console.log("Okay, Total to pay is  $", totalCost);
                            connection.end();
                        }

                    });

                }

            });
    });

}


