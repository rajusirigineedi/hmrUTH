/**
 * This is directly copied from prelude 'broswer-pack` to add in the build.
 * There is no escape. we have to do this.
 * The extra code that we'll see in the bundle is actually this below code. so we copied that all. and adding our own snippet
 */

// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer(modules, cache, entry) {
  /**
   * Our custom injected hotUpdate code.
   */
  this.hotUpdate = function (updatedModules) {
    for (var id in updatedModules) {
      if (Object.prototype.hasOwnProperty.call(updatedModules, id)) {
        // clear module definition from cache
        delete cache[id];
        // replace existing module definition from module map
        modules[id] = updatedModules[id];
        // Update module - 'newRequire' is from browser-pack
        newRequire(id);
        console.log("Update applied.", entry);
        // call entry point modules to bootstrap
        for (var i = 0; i < entry.length; i++) {
          console.log("entry " + i + ": " + entry[i]);
          // delete existing entry point module in cache
          // so that it is reinitialized
          delete cache[entry[i]];
          // call entry point module which will run
          // with new updates in cache
          newRequire(entry[i]);
        }
      }
    }
  };

  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require == "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require == "function" && require;
        if (!jumped && currentRequire) return currentRequire(name, true);

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) return previousRequire(name, true);
        var err = new Error("Cannot find module '" + name + "'");
        err.code = "MODULE_NOT_FOUND";
        throw err;
      }
      var m = (cache[name] = { exports: {} });
      modules[name][0].call(
        m.exports,
        function (x) {
          var id = modules[name][1][x];
          return newRequire(id ? id : x);
        },
        m,
        m.exports,
        outer,
        modules,
        cache,
        entry
      );
    }
    return cache[name].exports;
  }
  for (var i = 0; i < entry.length; i++) newRequire(entry[i]);

  // Override the current require with this new one
  return newRequire;
})({"/Users/sirigineedihemanthpallaparaju/Desktop/general/webpocs/webpackbasics/hmrUTH/app/message.js":[function(require,module,exports){
module.exports = "Hot update applied - abcddefg";

},{}],"/Users/sirigineedihemanthpallaparaju/Desktop/general/webpocs/webpackbasics/hmrUTH/app/app.js":[function(require,module,exports){
// require counter implementation from counter.js
var message = require("./message.js");

document.querySelector("#message").innerText = message;
// console.log(message);
console.log("s ");

},{"./message.js":"/Users/sirigineedihemanthpallaparaju/Desktop/general/webpocs/webpackbasics/hmrUTH/app/message.js"}]},{},["/Users/sirigineedihemanthpallaparaju/Desktop/general/webpocs/webpackbasics/hmrUTH/app/app.js"]);
