# most-client
A client library for connecting to a remote [MOST Web Framework](https://github.com/kbarbounakis/most-web) application

![MOST Web Framework Logo](https://www.themost.io/assets/images/most_logo_sw_240.png)

## Installation

    npm install most-client

or:

    bower install most-client

### Usage under node.js:

    var client = require("most-client"), context = client.context("http://data.example.com");
        context.model("Order")
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

Note: If you are intend to use client for cross domain requests enable the following features:

    $.context.defaults = {
        base:"http:/data.example.com/"
    };

    jQuery.ajaxSetup({
            xhrFields: { withCredentials: true },
            crossDomain: true
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

Note: If you are intended to use client for cross domain requests enable the following features:

    var app = angular.module("app",["most"]);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }
    ]);

    app.config(['$contextProvider', function($contextProvider) {
        $contextProvider.defaults.base = "http://data.example.com/";
    }]);

### Authentication

Use basic authentication (node.js, jQuery and AngularJS environment):

    context.authenticate("alexis.rees@example.com","user").then(function() {
        //
    }).catch(function(err) {
        console.log(err);
    });

Use cookie based authentication (node.js environment):

    //get cookie from request
    context.getService().setCookie(request.headers.cookie);