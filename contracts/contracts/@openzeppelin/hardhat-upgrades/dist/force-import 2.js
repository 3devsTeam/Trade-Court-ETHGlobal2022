"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeForceImport = void 0;
const upgrades_core_1 = require("@openzeppelin/upgrades-core");
const utils_1 = require("./utils");
const simulate_deploy_1 = require("./utils/simulate-deploy");
const deploy_impl_1 = require("./utils/deploy-impl");
function makeForceImport(hre) {
    return async function forceImport(proxyOrBeacon, ImplFactory, opts = {}) {
        const { provider } = hre.network;
        const manifest = await upgrades_core_1.Manifest.forNetwork(provider);
        const proxyOrBeaconAddress = (0, utils_1.getContractAddress)(proxyOrBeacon);
        const implAddress = await (0, upgrades_core_1.getImplementationAddressFromProxy)(provider, proxyOrBeaconAddress);
        if (implAddress !== undefined) {
            await importProxyToManifest(provider, hre, proxyOrBeaconAddress, implAddress, ImplFactory, opts, manifest);
            return ImplFactory.attach(proxyOrBeaconAddress);
        }
        else if (await (0, upgrades_core_1.isBeacon)(provider, proxyOrBeaconAddress)) {
            const beaconImplAddress = await (0, upgrades_core_1.getImplementationAddressFromBeacon)(provider, proxyOrBeaconAddress);
            await addImplToManifest(hre, beaconImplAddress, ImplFactory, opts);
            const UpgradeableBeaconFactory = await (0, utils_1.getUpgradeableBeaconFactory)(hre, ImplFactory.signer);
            return UpgradeableBeaconFactory.attach(proxyOrBeaconAddress);
        }
        else {
            throw new upgrades_core_1.ForceImportUnsupportedError(proxyOrBeaconAddress);
        }
    };
}
exports.makeForceImport = makeForceImport;
async function importProxyToManifest(provider, hre, proxyAddress, implAddress, ImplFactory, opts, manifest) {
    await addImplToManifest(hre, implAddress, ImplFactory, opts);
    let importKind;
    if (opts.kind === undefined) {
        if (await (0, upgrades_core_1.isBeaconProxy)(provider, proxyAddress)) {
            importKind = 'beacon';
        }
        else {
            const deployData = await (0, deploy_impl_1.getDeployData)(hre, ImplFactory, opts);
            importKind = (0, upgrades_core_1.inferProxyKind)(deployData.validations, deployData.version);
        }
    }
    else {
        importKind = opts.kind;
    }
    if (importKind === 'transparent') {
        await addAdminToManifest(provider, hre, proxyAddress, ImplFactory, opts);
    }
    await (0, upgrades_core_1.addProxyToManifest)(importKind, proxyAddress, manifest);
}
async function addImplToManifest(hre, implAddress, ImplFactory, opts) {
    await (0, utils_1.simulateDeployImpl)(hre, ImplFactory, opts, implAddress);
}
async function addAdminToManifest(provider, hre, proxyAddress, ImplFactory, opts) {
    const adminAddress = await (0, upgrades_core_1.getAdminAddress)(provider, proxyAddress);
    await (0, simulate_deploy_1.simulateDeployAdmin)(hre, ImplFactory, opts, adminAddress);
}
//# sourceMappingURL=force-import.js.map