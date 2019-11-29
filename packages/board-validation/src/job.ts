import { Precondition, and, every, optional } from '@quenk/preconditions';
import { Value } from '@quenk/noni/lib/data/json';
import { Job } from '@board/types/lib/data/job';
import { isRecord } from '@quenk/noni/lib/data/record';
import { restrict } from '@quenk/preconditions/lib/record';
import { isString, maxLength, minLength, trim } from '@quenk/preconditions/lib/string';

export const validate: Precondition<Value,Job> = and(isRecord, restrict<any, any, any, Job>({

    title:every(isString,trim,minLength(3),maxLength(140)),
    country:every(isString,trim,minLength(3),maxLength(140)),
    city:every(isString,trim,minLength(3),maxLength(140)),
    type:every(isString,trim,minLength(3),maxLength(512)),
    role:every(isString,trim,minLength(3),maxLength(255)),
    industry:optional(every(isString,trim,minLength(3),maxLength(140))),
    technologies:optional(every(isString,trim,maxLength(512))),
    description:every(isString,trim,minLength(1),maxLength(5000)),
    link:optional(every(isString,trim,minLength(3),maxLength(1024))),

}))