
export const USER_STATUS_ACTIVE = 5;
export const USER_STATUS_DISABLED =1;

/**
 * statusMap maps a status to text usable for the UI screens.
 */
export const statusMap : {[key:number]:string} = {

    [USER_STATUS_ACTIVE]: 'active',

    [USER_STATUS_DISABLED]: ' disabled'

}

export const getStatusText = (status:number) => statusMap[status] || 'Unknown';
