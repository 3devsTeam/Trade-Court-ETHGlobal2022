import { DeployOpts, ValidationOptions } from '@openzeppelin/upgrades-core';
export declare type Options = ValidationOptions & DeployOpts & {
    constructorArgs?: unknown[];
};
export declare function withDefaults(opts?: Options): Required<Options>;
export interface DeployProxyOptions extends Options {
    initializer?: string | false;
}
export interface UpgradeProxyOptions extends Options {
    call?: {
        fn: string;
        args?: unknown[];
    } | string;
    unsafeSkipStorageCheck?: boolean;
}
//# sourceMappingURL=options.d.ts.map