# most-client
Most Web Framework Application Client Library

## Installation

    npm install most-client

or:

    bower install most-client

### Usage under node.js:

    var client = require("most-client");
    client.context.model("Order")
        .select("id","customer", "orderedDate", "orderNumber")
        .expand("customer")
        .where("orderStatus/alternateName")
        .equal("OrderPaymentDue")
        .orderBy("orderedDate")
        .take(10)
        .items().then(function(result) {
            //enumerate items
        }).catch(function(err) {
            console.log(err);
        });

### Usage under jQuery:

    $.context.model("Order")
        .where("orderStatus")
        .equal(1)
        .orderBy("orderedDate")
        .take(10)
        .items().then(function(result) {
            //enumerate items
        }).catch(function(err) {
            console.log(err);
        });

 ### Usage under AngularJS:

    angular.module("app",["most"])
        .controller("OrderController", function($context) {
            $context.model("Order")
                .where("orderStatus")
                .equal(1)
                .orderBy("orderedDate")
                .take(10)
                .items().then(function(result) {
                    //enumerate items
                }).catch(function(err) {
                    console.log(err);
                });
        });
