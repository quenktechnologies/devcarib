"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tendrilShowNunjucks = require("@quenk/tendril-show-nunjucks");
var express = require("express");
var tendrilMiddlewareMorgan = require("@quenk/tendril-middleware-morgan");
var bodyParser = require("body-parser");
var events = require("../app/events");
var handlers_1 = require("./handlers");
var module_1 = require("@quenk/tendril/lib/app/module");
exports.template = function (_app) { return ({ 'create': 
    //@ts-ignore: 6133 
    function (_app) { return new module_1.Module(_app); },
    'id': "/",
    'server': { 'port': process.env['PORT'],
        'host': "0.0.0.0" },
    'app': { 'views': { provider: tendrilShowNunjucks.show,
            options: [{ path: "dest/main/views" }] },
        'middleware': { 'available': { public: { provider: express.static,
                    options: [__dirname + "/../../public", { maxAge: 0 }] },
                log: { provider: tendrilMiddlewareMorgan.log,
                    options: [process.env['MORGAN_LOG_FORMAT']] },
                json: { provider: bodyParser.json },
                urlencoded: { provider: bodyParser.urlencoded } },
            'enabled': ["log", "public", "json", "urlencoded"] },
        'on': { 'connected': events.connected,
            'started': events.started },
        'routes': function (_m) {
            return [{ method: 'get', path: '/', filters: [handlers_1.showForm] }
            ];
        } } }); };
//# sourceMappingURL=index.js.map