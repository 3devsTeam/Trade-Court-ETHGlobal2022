"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
require("./type-extensions");
const config_1 = require("hardhat/config");
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const plugins_1 = require("hardhat/plugins");
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
(0, config_1.subtask)(task_names_1.TASK_COMPILE_SOLIDITY, async (args, hre, runSuper) => {
    const { readValidations, ValidationsCacheOutdated, ValidationsCacheNotFound } = await Promise.resolve().then(() => __importStar(require('./utils/validations')));
    try {
        await readValidations(hre);
    }
    catch (e) {
        if (e instanceof ValidationsCacheOutdated || e instanceof ValidationsCacheNotFound) {
            args = { ...args, force: true };
        }
        else {
            throw e;
        }
    }
    return runSuper(args);
});
(0, config_1.subtask)(task_names_1.TASK_COMPILE_SOLIDITY_COMPILE, async (args, hre, runSuper) => {
    const { validate, solcInputOutputDecoder } = await Promise.resolve().then(() => __importStar(require('@openzeppelin/upgrades-core')));
    const { writeValidations } = await Promise.resolve().then(() => __importStar(require('./utils/validations')));
    // TODO: patch input
    const { output, solcBuild } = await runSuper();
    const { isFullSolcOutput } = await Promise.resolve().then(() => __importStar(require('./utils/is-full-solc-output')));
    if (isFullSolcOutput(output)) {
        const decodeSrc = solcInputOutputDecoder(args.input, output);
        const validations = validate(output, decodeSrc);
        await writeValidations(hre, validations);
    }
    return { output, solcBuild };
});
(0, config_1.extendEnvironment)(hre => {
    hre.upgrades = (0, plugins_1.lazyObject)(() => {
        const { silenceWarnings, getAdminAddress, getImplementationAddress, getBeaconAddress, } = require('@openzeppelin/upgrades-core');
        const { makeDeployProxy } = require('./deploy-proxy');
        const { makeUpgradeProxy } = require('./upgrade-proxy');
        const { makePrepareUpgrade } = require('./prepare-upgrade');
        const { makeDeployBeacon } = require('./deploy-beacon');
        const { makeDeployBeaconProxy } = require('./deploy-beacon-proxy');
        const { makeUpgradeBeacon } = require('./upgrade-beacon');
        const { makeForceImport } = require('./force-import');
        const { makeChangeProxyAdmin, makeTransferProxyAdminOwnership, makeGetInstanceFunction } = require('./admin');
        return {
            silenceWarnings,
            deployProxy: makeDeployProxy(hre),
            upgradeProxy: makeUpgradeProxy(hre),
            prepareUpgrade: makePrepareUpgrade(hre),
            deployBeacon: makeDeployBeacon(hre),
            deployBeaconProxy: makeDeployBeaconProxy(hre),
            upgradeBeacon: makeUpgradeBeacon(hre),
            forceImport: makeForceImport(hre),
            admin: {
                getInstance: makeGetInstanceFunction(hre),
                changeProxyAdmin: makeChangeProxyAdmin(hre),
                transferProxyAdminOwnership: makeTransferProxyAdminOwnership(hre),
            },
            erc1967: {
                getAdminAddress: proxyAddress => getAdminAddress(hre.network.provider, proxyAddress),
                getImplementationAddress: proxyAddress => getImplementationAddress(hre.network.provider, proxyAddress),
                getBeaconAddress: proxyAddress => getBeaconAddress(hre.network.provider, proxyAddress),
            },
            beacon: {
                getImplementationAddress: beaconAddress => (0, upgrades_core_1.getImplementationAddressFromBeacon)(hre.network.provider, beaconAddress),
            },
        };
    });
});
(0, config_1.extendConfig)((config) => {
    var _a, _b, _c, _d;
    var _e, _f, _g;
    for (const compiler of config.solidity.compilers) {
        (_a = compiler.settings) !== null && _a !== void 0 ? _a : (compiler.settings = {});
        (_b = (_e = compiler.settings).outputSelection) !== null && _b !== void 0 ? _b : (_e.outputSelection = {});
        (_c = (_f = compiler.settings.outputSelection)['*']) !== null && _c !== void 0 ? _c : (_f['*'] = {});
        (_d = (_g = compiler.settings.outputSelection['*'])['*']) !== null && _d !== void 0 ? _d : (_g['*'] = []);
        if (!compiler.settings.outputSelection['*']['*'].includes('storageLayout')) {
            compiler.settings.outputSelection['*']['*'].push('storageLayout');
        }
    }
});
(0, config_1.task)('verify').setAction(async (args, hre, runSuper) => {
    const { verify } = await Promise.resolve().then(() => __importStar(require('./verify-proxy')));
    return await verify(args, hre, runSuper);
});
//# sourceMappingURL=index.js.map