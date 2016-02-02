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

Load the following scripts:

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.2/es5-shim.min.js" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js" />
    <script type="text/javascript" src="/bower_components/most-client/most-client.js" />

and use $.context jQuery extension:

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

Load the following scripts:

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.2/es5-shim.min.js" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js" />
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.9/angular.min.js" />
    <script type="text/javascript" src="/bower_components/most-client/most-client.js" />

and use $context angular service:

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

### ClientDataContext Class

#### model(name)

Get an instance of ClientDataModel class based on the given name.

    context.model("Order").where("orderStatus").equal(1).items().then(function(result) {
        //
    }).catch(function(err) {
        console.log(err);
    });

#### getService()

Gets the instance of ClientDataService associated with this data context.

    console.log(context.getService().getBase());

#### setService(service)

Associates the given ClientDataService instance with this data context.

    context.setService(new MyDataService("http://data.example.com"));

### ClientDataModel Class

#### schema()

Returns the JSON schema of this data model.

    context.model("Order").schema().then(function(result) {
        result.attributes.forEach(function(x) {
            console.log(x.name);
        });
    }).catch(function(err) {
        console.log(err);
    }

#### asQueryable()

Returns an instance of ClientDataQueryable class associated with this model.

    $context.model("Order")
        .asQueryable()
        .select("id","customer/description as customerDescription", "orderDate", "orderedItem/name as orderedItemName")
        .where("paymentMethod/alternateName").equal("DirectDebit")
        .orderByDescending("orderDate")
        .take(10)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
            console.log(err);
    });

#### where(name)

Initializes a ClientDataQueryable instance for getting data.

    $context.model("Order")
        .where("orderedItem/category").equal("Laptops")
        .take(10)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
            console.log(err);
    });

