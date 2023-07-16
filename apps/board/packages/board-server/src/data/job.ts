export const JOB_STATUS_NEW = 'new';
export const JOB_STATUS_ACTIVE = 'active';
export const JOB_STATUS_ARCHIVED = 'archived';

export const REMOTE_STATUS_REMOTE = 'remote';
export const REMOTE_STATUS_HYBRID = 'hybird';
export const REMOTE_STATUS_ONSITE = 'on-site';

/**
 * jobStatuses allowed in a list.
 */
export const jobStatuses = [
    JOB_STATUS_NEW,
    JOB_STATUS_ACTIVE,
    JOB_STATUS_ARCHIVED
];

/**
 * remoteStatuses allowed in a list.
 */
export const remoteStatuses = [
    REMOTE_STATUS_REMOTE,
    REMOTE_STATUS_HYBRID,
    REMOTE_STATUS_ONSITE
];
