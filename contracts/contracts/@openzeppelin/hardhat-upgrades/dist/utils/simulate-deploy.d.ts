import type { ContractFactory } from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Options } from './options';
export declare function simulateDeployAdmin(hre: HardhatRuntimeEnvironment, ProxyAdminFactory: ContractFactory, opts: Options, adminAddress: string): Promise<void>;
export declare function simulateDeployImpl(hre: HardhatRuntimeEnvironment, ImplFactory: ContractFactory, opts: Options, implAddress: string): Promise<void>;
//# sourceMappingURL=simulate-deploy.d.ts.map