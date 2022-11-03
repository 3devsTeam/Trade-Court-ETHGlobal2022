import { StorageLayout, ValidationDataCurrent, ValidationOptions, Version } from '@openzeppelin/upgrades-core';
import type { ContractFactory } from 'ethers';
import type { EthereumProvider, HardhatRuntimeEnvironment } from 'hardhat/types';
import { Options } from './options';
interface DeployedProxyImpl {
    impl: string;
    kind: NonNullable<ValidationOptions['kind']>;
}
interface DeployedBeaconImpl {
    impl: string;
}
export interface DeployData {
    provider: EthereumProvider;
    validations: ValidationDataCurrent;
    unlinkedBytecode: string;
    encodedArgs: string;
    version: Version;
    layout: StorageLayout;
    fullOpts: Required<Options>;
}
export declare function getDeployData(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: Options): Promise<DeployData>;
export declare function deployProxyImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: Options, proxyAddress?: string): Promise<DeployedProxyImpl>;
export declare function deployBeaconImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: Options, beaconAddress?: string): Promise<DeployedBeaconImpl>;
export {};
//# sourceMappingURL=deploy-impl.d.ts.map