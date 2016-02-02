# most-client
A client library for connecting to a local or remote [MOST Web Framework](https://github.com/kbarbounakis/most-web) application

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

Gets an instance of ClientDataModel class based on the given name.

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

#### getName()

Gets a string which represents the name of this data model.

#### getService()

Gets the instance of ClientDataService associated with this data model.

#### remove(obj)

Removes the given item or array of items.

    var order = {
        id:1
    };
    context.model("Order").remove(order).then(function(result) {
        //
    }).catch(function(err) {
        console.log(err);
    }

#### save(obj)

Creates or updates the given item or array of items.

    var order = {
        id:1,
        orderStatus:7
    };
    context.model("Order").save(order).then(function(result) {
        //
    }).catch(function(err) {
        console.log(err);
    }

#### schema()

Returns the JSON schema of this data model.

    context.model("Order").schema().then(function(result) {
        result.attributes.forEach(function(x) {
            console.log(x.name);
        });
    }).catch(function(err) {
        console.log(err);
    }


#### select(...attr)

Initializes and returns an instance of ClientDataQueryable class by selecting an attribute or a collection of attributes.

    $context.model("Order")
        .select("id","customer","orderedItem","orderStatus")
        .orderBy("orderDate")
        .take(25)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
            console.log(err);
    });

#### skip(num)

Initializes and returns an instance of ClientDataQueryable class by specifying the number of records to be skipped.

    $context.model("Order")
        .skip(10)
        .take(10)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
            console.log(err);
    });

#### take(num)

Initializes and returns an instance of ClientDataQueryable class by specifying the number of records to be taken.

    $context.model("Order")
        .take(10)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
            console.log(err);
    });

#### where(attr)

Initializes a comparison expression by using the given attribute as left operand
and returns an instance of ClientDataQueryable class.

    $context.model("Order")
        .where("orderedItem/category").equal("Laptops")
        .take(10)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
            console.log(err);
    });

### ClientDataQueryable Class

ClientDataQueryable class enables developers to perform simple and extended queries against data models.
The ClienDataQueryable class follows [DataQueryable](https://docs.themost.io/most-data/DataQueryable.html)
which is introduced by [MOST Web Framework ORM server-side module](https://github.com/kbarbounakis/most-data).

#### Logical Operators

Or:

    $context.model("Product")
        .where("category").equal("Desktops")
        .or("category").equal("Laptops")
        .orderBy("price")
        .take(5)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
        console.log(err);
    });

And:

    $context.model("Product")
        .where("category").equal("Laptops")
        .and("price").between(200,750)
        .orderBy("price")
        .take(5)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
        console.log(err);
    });

#### Comparison Operators

Equal:

    $context.model("Order")
            .where("id").equal(10)
            .first()
            .then(function (result) {
                //
            }).catch(function (err) {
                console.log(err);
        });

Not equal:

    $context.model("Order")
            .where("orderStatus/alternateName").notEqual("OrderProblem")
            orderByDescending("orderDate")
            .take(10)
            .then(function (result) {
                //
            }).catch(function (err) {
                console.log(err);
        });

Greater than:

    $context.model("Order")
        .where("orderedItem/price").greaterThan(968)
        .and("orderedItem/category").equal("Laptops")
        .and("orderStatus/alternateName").notEqual("OrderCancelled")
        .select("id",
            "orderStatus/name as orderStatusName",
            "customer/description as customerDescription",
            "orderedItem")
        .orderByDescending("orderDate")
        .take(10)
        .items()
        .then(function (result) {
            return done();
        }).catch(function (err) {
        console.log(err);
        return done(err);
    });

Greater or equal:

    $context.model("Product")
        .where("price").greaterOrEqual(1395.9)
        .orderByDescending("price")
        .take(10)
        .items()
        .then(function (result) {
           //
        }).catch(function (err) {
        console.log(err);
    });

Lower than:

    $context.model("Product")
        .where("price").lowerThan(263.56)
        .orderBy("price")
        .take(10)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
        console.log(err);
    });

Lower or equal:

    $context.model("Product")
        .where("price").lowerOrEqual(263.56)
        .and("price").greaterOrEqual(224.52)
        .orderBy("price")
        .take(5)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
        console.log(err);
    });

Contains:

    $context.model("Product")
        .where("name").contains("Book")
        .and("category").equal("Laptops")
        .orderBy("price")
        .take(5)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
        console.log(err);
    });

Between:

    $context.model("Product")
        .where("category").equal("Laptops")
        .or("category").equal("Desktops")
        .andAlso("price").between(200,750)
        .orderBy("price")
        .take(5)
        .items()
        .then(function (result) {
            //
        }).catch(function (err) {
        console.log(err);
    });