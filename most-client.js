/**
 * MOST Web Framework
 * A JavaScript Web Framework
 * http://themost.io
 * Created by Kyriakos Barbounakis<k.barbounakis@gmail.com> on 2016-01-29.
 *
 * Copyright (c) 2014, Kyriakos Barbounakis k.barbounakis@gmail.com
 Anthi Oikonomou anthioikonomou@gmail.com
 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 * Neither the name of MOST Web Framework nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(undefined) {

    // Create Base64 Object
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

    // check for nodeJS
    var hasModule = (typeof module !== 'undefined' && module && module.exports);

    /**
     *
     * @constructor
     */
    function TextUtils() {

    }

    /**
     * @param {string} s
     * @returns {*}
     */
    TextUtils.toBase64 = function(s) {
        if (typeof s !== 'string') {
            return;
        }
        return Base64.encode(s);
    };

    /**
     *
     * @param {string} s
     * @returns {*}
     */
    TextUtils.fromBase64 = function(s) {
        if (typeof s !== 'string') {
            return;
        }
        return Base64.decode(s);
    };

    TextUtils.isNotEmptyString = function(s) {
        if (typeof s === 'string') {
            return (s.length>0);
        }
        return false;
    };

    /**
     * @param {...*} f
     * @returns {string}
     */
    TextUtils.format = function(f) {
        var i;
        if (typeof f !== 'string') {
            var objects = [];
            for (i  = 0; i < arguments.length; i++) {
                objects.push(arguments[i]);
            }
            return objects.join(' ');
        }
        i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(/%[sdj%]/g, function (x) {
            if (x === '%%') return '%';
            if (i >= len) return x;
            switch (x) {
                case '%s':
                    return String(args[i++]);
                case '%d':
                    return Number(args[i++]);
                case '%j':
                    return JSON.stringify(args[i++]);
                default:
                    return x;
            }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
            if (x === null || typeof x !== 'object') {
                str += ' ' + x;
            } else {
                str += ' ' + x.toString();
            }
        }
        return str;
    };

    function Args() {
        //
    }

    var jQuery = this.jQuery, angular = this.angular;
    /**
     * Checks the expression and throws an exception if the condition is not met.
     * @param {*} expr
     * @param {string} message
     */
    Args.check = function(expr, message) {
        Args.notNull(expr,"Expression");
        if (typeof expr === 'function') {
            expr.call()
        }
        var res;
        if (typeof expr === 'function') {
            res = !(expr.call());
        }
        else {
            res = (!expr);
        }
        if (res) {
            var err = new Error(message);
            err.code = "ECHECK";
            throw err;
        }
    };
    /**
     *
     * @param {*} arg
     * @param {string} name
     */
    Args.notNull = function(arg,name) {
        if (typeof arg === 'undefined' || arg == null) {
            var err = new Error(name + " may not be null or undefined");
            err.code = "ENULL";
            throw err;
        }
    };

    /**
     * @param {*} arg
     * @param {string} name
     */
    Args.notString = function(arg, name) {
        if (typeof arg !== 'string') {
            var err = new Error(name + " must be a string");
            err.code = "EARG";
            throw err;
        }
    };

    /**
     * @param {*} arg
     * @param {string} name
     */
    Args.notFunction = function(arg, name) {
        if (typeof arg !== 'function') {
            var err = new Error(name + " must be a function");
            err.code = "EARG";
            throw err;
        }
    };

    /**
     * @param {*} arg
     * @param {string} name
     */
    Args.notNumber = function(arg, name) {
        if (typeof arg !== 'string') {
            var err = new Error(name + " must be number");
            err.code = "EARG";
            throw err;
        }
    };
    /**
     * @param {string|*} arg
     * @param {string} name
     */
    Args.notEmpty = function(arg,name) {
        Args.notNull(arg,name);
        Args.notString(arg,name);
        if (arg.length == 0) {
            var err = new Error(name + " may not be empty");
            err.code = "EEMPTY";
            return err;
        }
    };

    /**
     * @param {number|*} arg
     * @param {string} name
     */
    Args.notNegative = function(arg,name) {
        Args.notNumber(arg,name);
        if (arg<0) {
            var err = new Error(name + " may not be negative");
            err.code = "ENEG";
            return err;
        }
    };

    /**
     * @param {number|*} arg
     * @param {string} name
     */
    Args.positive = function(arg,name) {
        Args.notNumber(arg,name);
        if (arg<=0) {
            var err = new Error(name + " may not be negative or zero");
            err.code = "EPOS";
            return err;
        }
    };

    /**
     * @param {string=} base - A string which represents the MOST Web Server base URI e.g. https://www.example.com.
     * @constructor
     */
    function ClientDataContext(base) {
        /**
         * @returns {string}
         */
        this.getBase = function() {
            return (base || "/");
        };
        var svc_ = new ClientDataService(base);
        /**
         * @returns {ClientDataService}
         */
        this.getService = function() {
            return svc_;
        };
        /**
         * @param {ClientDataService|*} value
         */
        this.setService = function(value) {
            svc_ = value;
        };
    }

    /**
     * @param {string} name
     * @returns {ClientDataModel|*}
     */
    ClientDataContext.prototype.model = function(name) {
        return new ClientDataModel(name, this.getService());
    };

    /**
     * @param {string} username
     * @param {string} password
     * @returns {Promise|*}
     */
    ClientDataContext.prototype.authenticate = function(username,password) {
        return this.getService().execute({
            method:"GET",
            url:"/User/index.json",
            data: {
                $filter:"id eq me()"
            },
            headers: {
                Authorization:"Basic " + TextUtils.toBase64(username + ":" + password)
            }
        });
    };

    /**
     * @param {string} base
     * @constructor
     */
    function ClientDataService(base) {
        this.getBase = function() {
            if (/\/$/.test(base)) {
                return base;
            }
            else {
                return base.concat("/");
            }
        };
    }

    /**
     * @param {{method:string,url:string,data:*,headers:*}|*} options
     * @returns {Promise|*}
     */
    ClientDataService.prototype.execute = function(options) {

        var self = this;
        return new Promise(function(resolve,reject) {
            try {
                Args.notNull(options.url,"Request URL");
                Args.check(!/^https?:\/\//i.test(options.url),"Request URL may not be an absolute URI");
                Args.notNull(jQuery,"jQuery");
                var url_ = self.getBase() + options.url.replace(/^\//i,"");
                jQuery.ajax({
                    method:options.method || "GET",
                    url:url_,
                    data: options.data || { },
                    headers: options.headers || { },
                    dataType:"json"
                }).done(function(result) {
                    return resolve(result)
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    var err = new Error(errorThrown);
                    err.code = jqXHR.status;
                    return reject(err)
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    };


    /**
     * @class FieldSelector
     * @param {string} name
     * @constructor
     */
    function FieldSelector(name) {
        this.name = name;
    }
    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.select = function(name) {
        return new FieldSelector(name);
    };

    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.count = function(name) {
        return new FieldSelector(TextUtils.format("count(%s)", name));
    };

    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.sum = function(name) {
        return new FieldSelector(TextUtils.format("sum(%s)", name));
    };

    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.max = function(name) {
        return new FieldSelector(TextUtils.format("max(%s)", name));
    };

    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.min = function(name) {
        return new FieldSelector(TextUtils.format("min(%s)", name));
    };

    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.average = function(name) {
        return new FieldSelector(TextUtils.format("avg(%s)", name));
    };

    /**
     * @param {string} name
     * @returns {FieldSelector}
     */
    FieldSelector.date = function(name) {
        return new FieldSelector(TextUtils.format("date(%s)", name));
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.getFullYear = function() {
        this.name = TextUtils.format("year(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.getDay = function() {
        this.name = TextUtils.format("day(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.getMonth = function() {
        this.name = TextUtils.format("month(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.getHours = function() {
        this.name = TextUtils.format("hour(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.getMinutes = function() {
        this.name = TextUtils.format("minute(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.getSeconds = function() {
        this.name = TextUtils.format("second(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.length = function() {
        this.name = TextUtils.format("length(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.floor = function() {
        this.name = TextUtils.format("floor(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.round = function() {
        this.name = TextUtils.format("round(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.toLocaleLowerCase = function() {
        this.name = TextUtils.format("tolower(%s)", this.name);
        return this;
    };

    /**
     * @returns {FieldSelector}
     */
    FieldSelector.prototype.toLocaleUpperCase = function() {
        this.name = TextUtils.format("toupper(%s)", this.name);
        return this;
    };


    /**
     * @param {string} alias
     */
    FieldSelector.prototype.as = function(alias) {
        this.as = alias;
    };


    /**
     * @returns {string}
     */
    FieldSelector.prototype.toString = function() {
        if (this.as) {
            return this.name + " as " + this.as;
        }
        else {
            return this.name;
        }
    };

    /**
     * @param {string} expr
     * @constructor
     */
    function FieldExpression(expr) {
        this.expr = expr;
    }

    FieldExpression.prototype.toString = function() {
        return this.expr;
    };

    /**
     * @param {string} expr
     * @returns {FieldExpression}
     */
    FieldExpression.create = function(expr) {
        return new FieldExpression(expr);
    };


    /**
     * @param {string} model - The target model
     * @param {ClientDataService|*=} service - The underlying data service
     * @constructor
     */
    function ClientDataQueryable(model, service) {
        Args.notEmpty(model,"Model");
        /**
         * @private
         */
        this.privates_ = { };
        var svc_ = service;
        /**
         * Gets an instance of ClientDataService which represents the data service provider
         * associated with this model
         * @returns {ClientDataService|*}
         */
        this.getService = function() {
            return svc_;
        };
        /**
         * @param {ClientDataService|*} value
         */
        this.setService = function(value) {
            svc_ = value;
        };
        var url_ = "/" + model + "/index.json";
        /**
         * Gets a string which represents a relative URI associated with this instance
         * @returns {string}
         */
        this.getUrl = function() {
            return url_;
        };
        /**
         * Sets a string which represents the relative URI associated with this instance
         * @param {string} value
         */
        this.setUrl = function(value) {
            Args.notEmpty(value,"Model URL");
            url_ = value;
        }
    }

    /**
     * Creates a new instance of ClientDataQueryable class
     * @param {string} model
     * @param {ClientDataService|*} service
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.create = function(model, service) {
        return new ClientDataQueryable(model,service);
    };

    /**
     * @returns {*}
     */
    ClientDataQueryable.prototype.copy = function() {
        var self = this, result = { };
        var keys = Object.keys(this);
        keys.forEach(function(key) { if (key.indexOf('$')==0) {
            result[key] = self[key];
        }
        });
        if (result.$prepared) {
            if (result.$filter)
                result.$filter = "(" + result.$prepared + ") and (" +  result.$filter + ")";
            else
                result.$filter = result.$prepared;
            delete result.$prepared;
        }
        return result;
    };

    ClientDataQueryable.escape = function(val)
    {
        if (val === undefined || val === null) {
            return 'null';
        }

        switch (typeof val) {
            case 'boolean': return (val) ? 'true' : 'false';
            case 'number': return val+'';
        }

        if (val instanceof Date) {
            var dt = new Date(val);
            var year   = dt.getFullYear();
            var month  = ClientDataQueryable.zeroPad(dt.getMonth() + 1, 2);
            var day    = ClientDataQueryable.zeroPad(dt.getDate(), 2);
            var hour   = ClientDataQueryable.zeroPad(dt.getHours(), 2);
            var minute = ClientDataQueryable.zeroPad(dt.getMinutes(), 2);
            var second = ClientDataQueryable.zeroPad(dt.getSeconds(), 2);
            var millisecond = ClientDataQueryable.zeroPad(dt.getMilliseconds(), 3);
            //format timezone
            var offset = (new Date()).getTimezoneOffset(),
                timezone = (offset>=0 ? '+' : '') + ClientDataQueryable.zeroPad(Math.floor(offset/60),2) + ':' + ClientDataQueryable.zeroPad(offset%60,2);
            val = "'" + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + millisecond + timezone + "'";
            return val;
        }

        if (typeof val === 'object' && Object.prototype.toString.call(val) === '[object Array]') {
            var values = [];
            val.forEach(function(x) {
                ClientDataQueryable.escape(x);
            });
            return values.join(',');
        }

        if (typeof val === 'object') {
            if (val.hasOwnProperty('$name'))
            //return field identifier
                return val['$name'];
            else
                return this.escape(val.valueOf())
        }

        val = val.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s) {
            switch(s) {
                case "\0": return "\\0";
                case "\n": return "\\n";
                case "\r": return "\\r";
                case "\b": return "\\b";
                case "\t": return "\\t";
                case "\x1a": return "\\Z";
                default: return "\\"+s;
            }
        });
        return "'"+val+"'";
    };

    ClientDataQueryable.zeroPad = function(number, length) {
        number = number || 0;
        var res = number.toString();
        while (res.length < length) {
            res = '0' + res;
        }
        return res;
    };

    /**
     * @private
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.append = function() {

        var self = this, exprs;
        if (self.privates_.left) {
            var expr = null;
            if (self.privates_.op=='in') {
                if (Array.isArray(self.privates_.right)) {
                    //expand values
                    exprs = [];
                    self.privates_.right.forEach(function(x) {
                        exprs.push(self.privates_.left + ' eq ' + ((typeof x === 'function') ? x.name + "()": ClientDataQueryable.escape(x)));
                    });
                    if (exprs.length>0)
                        expr = '(' + exprs.join(' or ') + ')';
                }
            }
            else if (self.privates_.op=='nin') {
                if (Array.isArray(self.privates_.right)) {
                    //expand values
                    exprs = [];
                    self.privates_.right.forEach(function(x) {
                        exprs.push(self.privates_.left + ' ne ' + ((typeof x === 'function') ? x.name + "()": ClientDataQueryable.escape(x)));
                    });
                    if (exprs.length>0)
                        expr = '(' + exprs.join(' and ') + ')';
                }
            }
            else {
                expr = self.privates_.left + ' ' + self.privates_.op + ' ' + ((typeof self.privates_.right === 'function') ? self.privates_.right.name + "()": ClientDataQueryable.escape(self.privates_.right));
            }
            if (expr) {
                if (typeof self.$filter === 'undefined' || self.$filter == null)
                    self.$filter = expr;
                else {
                    self.privates_.lop = self.privates_.lop || 'and';
                    self.privates_._lop = self.privates_._lop || self.privates_.lop;
                    if (self.privates_._lop == self.privates_.lop)
                        self.$filter = self.$filter + ' ' + self.privates_.lop + ' ' + expr;
                    else
                        self.$filter = '(' + self.$filter + ') ' + self.privates_.lop + ' ' + expr;
                    self.privates_._lop = self.privates_.lop;
                }
            }
        }
        delete self.privates_.lop;delete self.privates_.left; delete self.privates_.op; delete self.privates_.right;
        return this;
    };

    /**
     * @param {...string|FieldExpression} attr
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.select = function(attr) {
        var arr = [];
        delete this.$select;
        if (typeof attr === 'undefined' || attr == null) { return this; }
        if (typeof attr ===  "[object Array]") {
            return ClientDataQueryable.prototype.select.apply(this, attr);
        }
        var arg = Array.prototype.slice.call(arguments);
        for (var i = 0; i < arg.length; i++) {
            if (typeof arg[i] === 'string')
                arr.push(arg[i]);
            else if (arg[i] instanceof FieldSelector)
                arr.push(arg[i].toString());
            else
                throw new Error("Invalid argument. Expected string.");
        }
        if (arr.length >0) {
            /**
             * @private
             */
            this.$select = arr.join(",")
        }
        return this;
    };

    /**
     * @param {...string|FieldSelector} attr
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.groupBy = function(attr) {
        var arr = [];
        delete this.$groupby;
        if (typeof attr === 'undefined' || attr == null) { return this; }
        if (typeof attr ===  "[object Array]") {
            return ClientDataQueryable.prototype.groupBy.apply(this, attr);
        }
        var arg = Array.prototype.slice.call(arguments);
        for (var i = 0; i < arg.length; i++) {
            if (typeof arg[i] === 'string')
                arr.push(arg[i]);
            else if (arg[i] instanceof FieldSelector)
                arr.push(arg[i].toString());
            else
                throw new Error("Invalid argument. Expected string.");
        }
        if (arr.length >0) {
            /**
             * @private
             */
            this.$groupby = arr.join(",")
        }
        return this;
    };

    /**
     * @param {...string} attr
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.expand = function(attr) {
        var arr = [];
        delete this.$expand;
        if (typeof attr === 'undefined' || attr == null) { return this; }
        if (typeof attr ===  "[object Array]") {
            return ClientDataQueryable.prototype.expand.apply(this, attr);
        }
        var arg = Array.prototype.slice.call(arguments);
        for (var i = 0; i < arg.length; i++) {
            if (typeof arg[i] === 'string')
                arr.push(arg[i]);
            else
                throw new Error("Invalid argument. Expected string.");
        }
        if (arr.length >0) { this.$expand = arr.join(",") }
        return this;
    };


    /**
     * @param {string} s
     */
    ClientDataQueryable.prototype.filter = function(s) {
        var self = this;
        delete this.$filter;
        var p = self.privates_;
        delete p.left; delete p.right; delete p.op; delete p.lop; delete p._lop;
        if (typeof s !== 'string')
            return this;
        if (s.length==0)
            return this;
        //set filter
        this.$filter = s;
        return this;
    };

    ClientDataQueryable.prototype.prepare = function() {
        if (this.$filter) {
            if (typeof this.$prepared === 'undefined' || this.$prepared == null) {
                this.$prepared = this.$filter;
            }
            else {
                this.$prepared = TextUtils.format('(%s) and (%s)', this.$prepared, this.$filter);
            }
            delete this.$filter;
        }
        return this;
    };

    ClientDataQueryable.prototype.toFilter = function() {
        if (typeof this.$filter !== 'undefined' && this.$filter != null) {
            if (typeof this.$prepared === 'undefined' || this.$prepared === null) {
                return this.$filter;
            }
            else {
                return TextUtils.format('(%s) and (%s)', this.$prepared, this.$filter);
            }
        }
        else if(typeof this.$prepared !== 'undefined' && this.$prepared != null) {
            return this.$prepared;
        }
    };

    /**
     *
     * @param s
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.andAlso = function(s) {
        var self = this;
        if (typeof s !== 'string')
            return self;
        if (s.length==0)
            return self;
        if (self.$filter) {
            self.$filter = '(' + self.$filter + ') and (' + s + ')';
        }
        var p = self.privates_;
        p._lop = 'and';
        delete p.left; delete p.right; delete p.op;
        return self;
    };

    /**
     *
     * @param {string|FieldSelector} attr
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.orElse = function(attr) {
        var self = this;
        Args.notNull(attr,"Attribute");
        if (typeof attr === 'string') {
            Args.notEmpty(attr,"Attribute");
        }
        if (self.$filter)
            self.$filter = '(' + self.$filter + ') or (' + attr + ')';
        else
            self.$filter = attr;
        var p = self.privates_;
        p._lop = 'or';
        delete p.left; delete p.right; delete p.op;
        return self;
    };

    /**
     * @param {number} val
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.take = function(val) {
        this.$top = val;
        return this;
    };
    /**
     * @returns {Promise|*}
     */
    ClientDataQueryable.prototype.all = function() {
        this.$top = -1;
        delete this.$skip;
        delete this.$first;
        delete this.$inlinecount;
        return this.getService().execute({
            method:"GET",
            url:this.getUrl(),
            data:this.copy()
        });
    };

    /**
     * @returns {Promise|*}
     */
    ClientDataQueryable.prototype.first = function() {
        delete this.$top;
        delete this.$skip;
        delete this.$inlinecount;
        this.$first = true;
        return this.getService().execute({
            method:"GET",
            url:this.getUrl(),
            data:this.copy()
        });
    };
    /**
     * @returns {Promise|*}
     */
    ClientDataQueryable.prototype.item = function() {
        return this.first();
    };
    /**
     * @returns {Promise|*}
     */
    ClientDataQueryable.prototype.items = function() {
        delete this.$first;
        this.$inlinecount = false;
        return this.getService().execute({
            method:"GET",
            url:this.getUrl(),
            data:this.copy()
        });
    };

    /**
     * @returns {Promise|*}
     */
    ClientDataQueryable.prototype.list = function() {
        delete this.$first;
        this.$inlinecount = true;
        return this.getService().execute({
            method:"GET",
            url:this.getUrl(),
            data:this.copy()
        });
    };

    /**
     * @param {number} val
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.skip = function(val) {
        Args.notNumber(name,"The number of items to be skipped");
        this.$skip = val;
        return this;
    };

    /**
     * @param {string|FieldSelector} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.orderBy = function(name) {
        Args.notNull(name,"Order by attribute");
        this.$orderby = name.toString();
        return this;
    };

    /**
     * @param {string|FieldSelector} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.orderByDescending = function(name) {
        Args.notNull(name,"Order by attribute");
        this.$orderby = name.toString() + ' desc';
        return this;
    };

    /**
     * @param {string|FieldSelector} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.thenBy = function(name) {
        Args.notNull(name,"Order by attribute");
        this.$orderby += (this.$orderby ? ',' + name.toString() : name.toString());
        return this;
    };

    /**
     * @param {string|FieldSelector} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.thenByDescending = function(name) {
        Args.notNull(name,"Order by attribute");
        this.$orderby += (this.$orderby ? ',' + name.toString() : name.toString()) + ' desc';
        return this;
    };

    /**
     * @param {string} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.where = function(name) {
        delete this.$filter;
        Args.notNull(name,"The left operand of a where expression");
        this.privates_.left = name;
        return this;
    };

    /**
     * @param {string|FieldSelector|*} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.and = function(name) {
        Args.notNull(name,"The left operand of a logical expression");
        this.privates_.lop = 'and';
        this.privates_.left = name;
        return this;
    };

    /**
     * @param {string|FieldSelector|*} name
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.or = function(name) {
        this.privates_.lop = 'or';
        Args.notNull(name,"The left operand of alogical expression");
        this.privates_.left = name;
        return this;
    };

    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.equal = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = Array.isArray(value) ? 'eq' : 'eq';
        this.privates_.right = value; return this.append();
    };

    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.notEqual = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = Array.isArray(value) ? 'nin' : 'ne';
        this.privates_.right = value; return this.append();
    };


    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.greaterThan = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = 'gt';this.privates_.right = value; return this.append();
    };

    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.greaterOrEqual = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = 'ge';this.privates_.right = value; return this.append();
    };

    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.lowerThan = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = 'lt';this.privates_.right = value; return this.append();
    };

    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.lowerOrEqual = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = 'le';this.privates_.right = value; return this.append();
    };

    /**
     * @param {*} value
     * @returns ClientDataQueryable
     */
    ClientDataQueryable.prototype.contains = function(value) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.op = 'ge';
        this.privates_.left = TextUtils.format('indexof(%s,%s)', this.privates_.left, ClientDataQueryable.escape(value));
        this.privates_.right = 0;
        return this.append();
    };

    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getDate = function() {
        this.privates_.left = TextUtils.format('date(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getDay = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('day(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getMonth = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('month(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getYear = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('year(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getHours = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('hour(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getMinutes = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('minute(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.getSeconds = function() {
        this.privates_.left = TextUtils.format('second(%s)',this.privates_.left);
        return this;
    };
    /**
     * @param {string} s
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.indexOf = function(s) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('indexof(%s,%s)', this.privates_.left, ClientDataQueryable.escape(s));
        return this;
    };
    /**
     * @param {number} pos
     * @param {number} length
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.substr = function(pos, length) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('substring(%s,%s,%s)',this.privates_.left, pos, length);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.floor = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('floor(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.round = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('round(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.length = function() {
        this.privates_.left = TextUtils.format('length(%s)',this.privates_.left);
        return this;
    };

    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.toLocaleLowerCase = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('tolower(%s)',this.privates_.left);
        return this;
    };

    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.toLowerCase = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('tolower(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.toUpperCase = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('toupper(%s)',this.privates_.left);
        return this;
    };
    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.toLocaleUpperCase = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('toupper(%s)',this.privates_.left);
        return this;
    };

    /**
     * @param {string} s
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.startsWith = function(s) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('startswith(%s,%s)',this.privates_.left, ClientDataQueryable.escape(s));
        return this;
    };

    /**
     * @param {string} s
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.endsWith = function(s) {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('endswith(%s,%s)',this.privates_.left, ClientDataQueryable.escape(s));
        return this;
    };

    /**
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.trim = function() {
        Args.notNull(this.privates_.left,"The left operand");
        this.privates_.left = TextUtils.format('trim(%s)',this.privates_.left);
        return this;
    };

    /**
     * @param {...*} s
     * @returns {ClientDataQueryable}
     */
    ClientDataQueryable.prototype.concat = function(s) {
        Args.notNull(this.privates_.left,"The left operand");
        var res = 'concat(' + this.privates_.left;
        for (var i = 0; i < arguments.length; i++) res += ',' + ClientDataQueryable.escape(arguments[i]);
        res += ')';
        this.privates_.left = res;
        return this;
    };



    /**
     * @param {string} name
     * @param {ClientDataService|*} service
     * @constructor
     */
    function ClientDataModel(name, service) {
        /**
         * Gets a string which represents the name of this model
         * @returns {string}
         */
        this.getName = function() {
            return name;
        };
        /**
         * Gets an instance of ClientDataService which represents the current data service
         * @returns {ClientDataService|*}
         */
        this.getService = function() {
            return service;
        };
    }

    /**
     * Gets an instance of ClientDataQueryable based on the current model
     * @returns {ClientDataQueryable|*}
     */
    ClientDataModel.prototype.asQueryable = function() {
        return ClientDataQueryable.create(this.getName(),this.getService());
    };

    /**
     * @param {*} obj
     * @returns {Promise|*}
     */
    ClientDataModel.prototype.save = function(obj) {
        return this.getService().execute({ method:"POST", url:"/" + this.name + "/schema.json", data:obj });
    };

    /**
     * @param {*} obj
     * @returns {Promise|*}
     */
    ClientDataModel.prototype.remove = function(obj) {
        return this.getService().execute({ method:"DELETE", url:"/" + this.name + "/index.json", data:obj });
    };

    /**
     * @param {string|FieldSelector} attr
     * @returns {ClientDataQueryable}
     */
    ClientDataModel.prototype.where = function(attr) {
        return this.asQueryable().where(attr);
    };

    /**
     * @param {...string|FieldSelector} attr
     * @returns {ClientDataQueryable}
     */
    ClientDataModel.prototype.orderBy = function(attr) {
        return ClientDataQueryable.prototype.orderBy.apply(this.asQueryable(),arguments);
    };

    /**
     * @param {...string|FieldSelector} attr
     * @returns {ClientDataQueryable}
     */
    ClientDataModel.prototype.orderByDescending = function(attr) {
        return ClientDataQueryable.prototype.orderByDescending.apply(this.asQueryable(),arguments);
    };

    /**
     * @param {...string|FieldSelector} attr
     * @returns {ClientDataQueryable}
     */
    ClientDataModel.prototype.select = function(attr) {
        return ClientDataQueryable.prototype.select.apply(this.asQueryable(),arguments);
    };

    /**
     * @returns {Promise|*}
     */
    ClientDataModel.prototype.first = function() {
        return this.asQueryable().first();
    };

    /**
     * @params {number|*} val
     * @returns {ClientDataQueryable|*}
     */
    ClientDataModel.prototype.skip = function(val) {
        return this.asQueryable().skip(val);
    };

    /**
     * @params {number|*} val
     * @returns {ClientDataQueryable}
     */
    ClientDataModel.prototype.take = function(val) {
        return this.asQueryable().take(val);
    };

    /**
     * @returns {Promise|*}
     */
    ClientDataModel.prototype.list = function() {
        return this.asQueryable().list();
    };

    if (hasModule) {

        /**
         * @param {string} base
         * @constructor
         * @augments ClientDataService
         */
        function NodeDataService(base) {
            this.getBase = function() {
                if (/\/$/.test(base)) {
                    return base;
                }
                else {
                    return base.concat("/");
                }
            };
            var cookie;
            this.getCookie = function() {
                return cookie;
            };
            this.setCookie = function(value) {
                cookie = value;
            };
        }

        /**
         * @param {{method:string,url:string,data:*,headers:*}|*} options
         * @returns {Promise|*}
         */
        NodeDataService.prototype.execute = function(options) {
            var self = this,
                unirest = require("unirest"),
                url = require("url"),
                Q = require("q"),
                deferred = Q.defer();
            process.nextTick(function() {
                try {
                    //options defaults
                    options.method = options.method || "GET";
                    options.headers = options.headers || { };
                    //validate options URL
                    Args.notNull(options.url,"Request URL");
                    //validate URL format
                    Args.check(!/^https?:\/\//i.test(options.url),"Request URL may not be an absolute URI");
                    //validate request method
                    Args.check(/^GET|POST|PUT|DELETE$/i.test(options.method),"Invalid request method. Expected GET, POST, PUT or DELETE.");
                    //initialize unirest method e.g. unirest.get(URL), unirest.post(URL) etc.
                    var request = unirest[options.method.toLowerCase()](url.resolve(self.getBase(), options.url));
                    //set request type
                    request.type("application/json");
                    if (self.getCookie()) {
                        options.headers["Cookie"] = self.getCookie();
                    }
                    //set headers
                    request.headers(options.headers);

                    //set query params
                    if ((options.method==="GET") && options.data) {
                        request.query(options.data);
                    }
                    //or data to send
                    else if (options.data) {
                        request.send(options.data);
                    }
                    //complete request
                    request.end(function (response) {
                        if (response.status === 200) {
                            if (response.headers["set-cookie"]) {
                                self.setCookie(response.headers["set-cookie"]);
                            }
                            deferred.resolve(response.body);
                        }
                        else {
                            var er = new Error(response.statusMessage);
                            er.code = response.status;
                            deferred.reject(er);
                        }
                    });
                }
                catch(e) {
                    deferred.reject(e);
                }
            });
            return deferred.promise;

        };

        module.exports = {
            /**
             * @param {string=} base - A string which represents the MOST Web Server base URI e.g. https://www.example.com.
             * If this parameter is missing the newly created data context will be associated with local server.
             * @returns {ClientDataContext}
             */
            context: function(base) {
                var result = new ClientDataContext(base);
                result.setService(new NodeDataService(result.getBase()));
                return result;
            }
        };
    }
    /**
     * JQUERY IMPLEMENTATION
     */
    else if (jQuery) {
        /**
         * @param {string=} base - A string which represents the MOST Web Server base URI e.g. https://www.example.com.
         * If this parameter is missing the newly created data context will be associated with local server.
         * @returns {ClientDataContext}
         */
        jQuery.context = function(base) {
            return new ClientDataContext(base || jQuery.context.defaults.base);
        };
        jQuery.context.defaults = {
            base:"/"
        };
    }
    /**
     * END OF JQUERY IMPLEMENTATION
     */

    /**
     * ANGULAR IMPLEMENTATION
     */
    if (angular) {

        /**
         * @param {string} base
         * @constructor
         * @augments ClientDataService
         */
        function AngularDataService(base) {
            this.getBase = function() {
                if (/\/$/.test(base)) {
                    return base;
                }
                else {
                    return base.concat("/");
                }
            };
            var cookie;
            this.getCookie = function() {
                return cookie;
            };
            this.setCookie = function(value) {
                cookie = value;
            };
        }

        /**
         * @param {{method:string,url:string,data:*,headers:*}|*} options
         * @returns {Promise|*}
         */
        AngularDataService.prototype.execute = function(options) {

            var self = this,
                $injector = angular.element(document.body).injector(),
                $http = $injector.get("$http"),
                $q = $injector.get("$q"),
                deferred = $q.defer();
            setTimeout(function() {
                try {
                    //options defaults
                    options.method = options.method || "GET";
                    options.headers = options.headers || { };
                    //set content type
                    options.headers["Content-Type"] = "application/json";
                    //validate options URL
                    Args.notNull(options.url,"Request URL");
                    //validate URL format
                    Args.check(!/^https?:\/\//i.test(options.url),"Request URL may not be an absolute URI");
                    //validate request method
                    Args.check(/^GET|POST|PUT|DELETE$/i.test(options.method),"Invalid request method. Expected GET, POST, PUT or DELETE.");
                    var url_ = self.getBase() + options.url.replace(/^\//i,"");
                    var o = {
                        method: options.method,
                        url: url_,
                        headers:options.headers
                    };
                    if (/^GET$/.test(options.method)) {
                        o.params = options.data;
                    }
                    else {
                        o.data = options.data;
                    }
                    $http(o).then(function (response) {
                        deferred.resolve(response.data);
                    }, function (err) {
                        deferred.reject(err);
                    });
                }
                catch(e) {
                    deferred.reject(e);
                }
            });
            return deferred.promise;
        };

        var most = angular.module("most",[]);
        /**
         * @ngdoc service
         * @name $context
         * @type ClientDataContext
         * @description
         * Use `$context` to access MOST Data Services.
         * */
        most.provider("$context", function ClientDataContextProvider() {
            this.defaults = { base:"/" };
            this.$get = function () {
                var result = new ClientDataContext(this.defaults.base || "/");
                result.setService(new AngularDataService(result.getBase()));
                return result;
            };
        });
    }
})(this);