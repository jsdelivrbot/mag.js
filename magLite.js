//////////////////////////////////
//MagJS
//////////////////////////////////

/**!
* @name mag.js - Copyright (c) 2013 Michael Glazer
* @description MagnumJS core code library
* @requires - jQuery http://www.jquery.com
* @author Michael Glazer 
* @date August 18, 2013
* @version 0.1 - Alpha
* @license MIT https://github.com/magnumjs/mag.js/blob/master/LICENSE
* @link https://github.com/magnumjs
*/

;
'use strict';
(function ($, namespace, undefined) {


})(jQuery, window.mag = window.mag || {});



mag.aspect = {
    injectors: [],
    namespace: null,
    add: function (type, name, fun) {
        mag.aspect.injectors.push({
            type: type,
            name: name,
            fun: fun
        });
    },
    attach: function () {
        for (var i in mag.aspect.injectors) {
            var inject = mag.aspect.injectors[i];
            if (mag.aspect[inject.type]) {
                mag.aspect[inject.type](inject.name, inject.fun);
            }
        }
    },
    around: function (pointcut, advice) {

        var ns = mag.aspect.namespace;
        for (var member in mag.aspect.namespace) {

            if (typeof ns[member] == 'function' && member.match(pointcut)) {

                (function (fn, fnName, ns) {

                    ns[fnName] = function () {
                        return advice.call(ns, {
                            fn: fn,
                            fnName: fnName,
                            arguments: arguments
                        });
                    };
                })(ns[member], member, ns);
            }
        }

    },
    before: function (pointcut, advice) {
        mag.aspect.around(pointcut,
            function (f) {
                advice.apply(mag.aspect.namespace, f.arguments);
                return mag.aspect.next(f)
            });
    },
    after: function (pointcut, advice) {
        mag.aspect.around(pointcut,
            function (f) {
                var ret = mag.aspect.next(f);
                advice.apply(mag.aspect.namespace, f.arguments);
                return ret;
            });
    },
    next: function (f) {
        return f.fn.apply(mag.aspect.namespace, f.arguments);
    }
};

mag.inject = function (ns) {
    mag.aspect.namespace = ns;
    mag.aspect.attach();
}
mag.module = function (name) {
    var Injector = {

        dependencies: {},

        process: function (target) {
            var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
            var FN_ARG_SPLIT = /,/;
            var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
            var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            var text = target.toString();
            var args = text.match(FN_ARGS)[1].split(',');

            target.apply(target, this.getDependencies(args));
        },

        getDependencies: function (arr) {
            var self = this;
            return arr.map(function (value) {

                return self.dependencies[value];
            });
        },

        register: function (name, dependency) {
            this.dependencies[name] = dependency;
        }

    };
    return new function () {

        this.name = name;
        this.service = function (name, fun) {
            this.services = this.services || {};
            this.services[name] = new fun();
            Injector.register(name, this.services[name]);
        }
        this.factory = function (name, fun) {
            this.factories = this.factories || {};
            this.factories[name] =this.factories[name]|| fun();
            Injector.register(name, this.factories[name]);
        }
        this.control = function (name, fun) {
            this.controls = this.controls || {};
            Injector.register('Scope', this.getScope(name));
            this.fire('mag-preload', [name]);
            Injector.process(fun);
            this.fire('mag-postload', [name]);
        }
        this.getScope = function (name) {
            return this.controls[name] = this.controls[name] || {};
        }
        this.observers = {};
        this.on = function (eventName, listener) {
            if (!this.observers[eventName]) this.observers[eventName] = [];
            this.observers[eventName].push(listener);
        }
        this.fire = function (eventName, args) {
            if (this.observers[eventName]) {
                for (var i = 0; i < this.observers[eventName].length; i++) {
                    this.observers[eventName][i].apply(this, args);
                }
            }
        }
        mag.inject(this);
    }

}

/*
  
mag.template=function(f) {
 console.log('[before ' + f.fnName + ']');
 mag.aspect.next(f);
 console.log('[after ' + f.fnName + ']');
 }; 


mag.aspect.add('around','control',mag.template);

var app = mag.module('myApp');

// singleton object instance "new"
app.service('Api',function(){
  this.getProjects = function(){  
    return new Object({first:'Mike',last:'Glazer'});
  }
});


app.control('myCtrl',function(Scope){
  Scope.test='Yo';
});
app.control('myCtrl',function(Scope){
  console.log(Scope);
});
*/
