"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefaults = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
function withDefaults(opts = {}) {
    var _a, _b, _c;
    return {
        constructorArgs: (_a = opts.constructorArgs) !== null && _a !== void 0 ? _a : [],
        timeout: (_b = opts.timeout) !== null && _b !== void 0 ? _b : 60e3,
        pollingInterval: (_c = opts.pollingInterval) !== null && _c !== void 0 ? _c : 5e3,
        ...(0, upgrades_core_1.withValidationDefaults)(opts),
    };
}
exports.withDefaults = withDefaults;
//# sourceMappingURL=options.js.map