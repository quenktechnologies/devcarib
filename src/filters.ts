import * as moment from 'moment';

/**
 * timestamp displays a date in the follwing format: "January 30th 2021".
 */
export const timestamp = (str: string) => {

    let stamp = moment(str);

    if ((str === '') || (!stamp.isValid())) return '';

    return stamp.format('MMMM Do YYYY');

}

/**
 * timefromnow displays the distance of a date from the current date.
 */
export const timefromnow = (str:string) => {

    let date = moment(str);

    if ((str === '') || (!date.isValid())) return '';

    return date.fromNow();

}
