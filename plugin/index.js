"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird_1 = require("bluebird");
var util_1 = require("@quenk/noni/lib/data/record");
exports.default = {
    name: 'filter-policies',
    docopt: '',
    init: function () { return function (prog) {
        prog.after.push(function (p) {
            p.engine.addGlobal('join', function (l, r) { return [l, r].filter(function (v) { return v; }).join('.'); });
            p.engine.addFilter('mergevariants', function (o) {
                return util_1.reduce(o.variants, function (p, c) { return util_1.merge(p, c.properties); }, {});
            });
            return bluebird_1.resolve(p);
        });
        return bluebird_1.resolve(prog);
    }; }
};
//# sourceMappingURL=index.js.map