import { Value } from '@quenk/noni/lib/data/jsonx';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Invite } from '@mia/types/lib/invite';
export declare class EmailColumn implements Column<Value, Invite> {
    name: string;
    heading: string;
}
export declare class UrlColumn implements Column<Value, Invite> {
    name: string;
    heading: string;
}
export declare class CreatedByColumn implements Column<Value, Invite> {
    name: string;
    heading: string;
    format: (inv: Value) => string;
}
