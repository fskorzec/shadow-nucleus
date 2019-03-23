import { TSendQuery, TReturnableEvent } from "../../../core/BaseComponent";
declare const Evts: {
    WEBPACK: {
        PACKAGING: {
            PACK: string;
            PACKED: string;
            FAILED: string;
        };
    };
};
export declare type TSendPackQuery = TSendQuery<TSendPackQueryArgs>;
export declare type TSendPackQueryArgs = {
    entry: string;
    outPath: string;
    outFile: string;
} & TReturnableEvent;
export { Evts };
//# sourceMappingURL=Events.d.ts.map