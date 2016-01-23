var self = require('sdk/self');
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",//https://inbox.google.com*",
  contentScriptFile: ["./jquery-2.2.0.min.js", "./setOps.js", "./inbox_script.js"]
});
