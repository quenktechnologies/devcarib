export declare const USER_STATUS_ACTIVE = 5;
export declare const USER_STATUS_DISABLED = 1;
/**
 * statusMap maps a status to text usable for the UI screens.
 */
export declare const statusMap: {
    [key: number]: string;
};
export declare const getStatusText: (status: number) => string;
