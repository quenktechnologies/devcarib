import { Object } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Except } from '@quenk/noni/lib/control/error';
import { Action } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { EnabledPolicies } from '@quenk/search-filters-mongodb';
/**
 * CompileQueryConf provies the configuration for compile().
 */
export interface CompileQueryConf {
    /**
     * policies is a Record of all filter policies used by the app for reach
     * target route.
     */
    policies: Record<EnabledPolicies>;
    /**
     * fields is a Record of all mongodb project specifiers used by the app for
     * each target route.
     */
    fields: Record<Record<number>>;
}
/**
 * compileQueryString compiles the "q" query parameter into a filter object that
 * can be used with mongodb queries.
 *
 * Works via the @quenk/search-filters-mongodb module.
 */
export declare const compileQueryString: (policies: EnabledPolicies, q: string) => Except<Object>;
/**
 * compileSortString turns a sort indicator string into an object that could be
 * used in a mongodb query.
 *
 * Only one field can be sorted on at a time and it must be in the policy ref
 * document provided.
 */
export declare const compileSortString: (refs: {
    [key: string]: number;
}, sort: string) => Object;
/**
 * compile shapes the query parameters of an incomming request so they can
 * be used in a mongodb query.
 *
 * This filter relies on the +policy tag being set to determine the correct
 * policy and fields document to use. Note that they must have the same value.
 */
export declare const compile: (conf: CompileQueryConf) => (req: Request) => Action<void>;
