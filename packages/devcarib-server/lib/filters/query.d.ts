import { Object } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Except } from '@quenk/noni/lib/control/error';
import { Action } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { EnabledPolicies } from '@quenk/search-filters-mongodb';
/**
 * CompileQueryTagConf provies the configuration for compileQueryTag().
 */
export interface CompileQueryTagConf {
    /**
     * policies is a Record of all filter policies used by the app for reach
     * target route.
     */
    policies: Record<EnabledPolicies>;
}
/**
 * CompileSearchTagConf provies the configuration for compileSearchTag().
 */
export interface CompileSearchTagConf extends CompileQueryTagConf {
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
 * compile combines the compileSearchTag, compileQueryTag and compileGetTag into
 * one filter.
 */
export declare const compile: (conf: CompileSearchTagConf) => (req: Request) => Action<void>;
/**
 * compileSearchTag shapes the query parameters of an incoming search request so
 * they can be used in a mongodb query.
 *
 * This filter relies on the +search tag to determine the correct
 * policy and fields from the provided configuration to use. The configuration
 * should therefore have them under the same name.
 *
 * Additional restrictions can be placed on the parsed query via the +query
 * tag which will be interpolated against the request then parsed into a
 * separate filter which is finally combined with the user query via $and.
 *
 * This can be taken advantage of to restrict the scope of user submitted
 * queries easily.
 */
export declare const compileSearchTag: (conf: CompileSearchTagConf) => (req: Request) => Action<void>;
/**
 * compileQueryTag compiles the string specified in the +query tag into the
 * request.query property for PATCH and DELETE requests for routes it is
 * configured for.
 *
 * It uses the +policy or +model tags to determine which policy to use
 * The +query value is first interpolated with the Request object.
 */
export declare const compileQueryTag: (conf: CompileQueryTagConf) => (req: Request) => Action<void>;
/**
 * compileGetTag shapes the query parameters of an incoming get request so
 * it can be used in a mongodb query.
 *
 * This filter relies on the +get tag to determine the correct field set to set
 * the query.fields property to. A query filter can optionally be specified via
 * the +query parameter which will be parsed and set to query.query if
 * successful.
 *
 * The +get value is first interpolated with the Request object.
 */
export declare const compileGetTag: (conf: CompileSearchTagConf) => (req: Request) => Action<void>;
