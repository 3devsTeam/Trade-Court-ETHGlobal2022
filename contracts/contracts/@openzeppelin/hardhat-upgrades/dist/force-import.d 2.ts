import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { ContractFactory, Contract } from 'ethers';
import { Options } from './utils';
export interface ForceImportFunction {
    (proxyAddress: string, ImplFactory: ContractFactory, opts?: Options): Promise<Contract>;
}
export declare function makeForceImport(hre: HardhatRuntimeEnvironment): ForceImportFunction;
//# sourceMappingURL=force-import.d.ts.map