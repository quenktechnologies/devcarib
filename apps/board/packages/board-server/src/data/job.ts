export const JOB_STATUS_NEW = 'new';
export const JOB_STATUS_ACTIVE = 'active';
export const JOB_STATUS_ARCHIVED = 'archived';

export const JOB_REMOTE_STATUS_REMOTE = 'remote';
export const JOB_REMOTE_STATUS_HYBRID = 'hybird';
export const JOB_REMOTE_STATUS_ONSITE = 'on-site';

export const JOB_TYPE_FULL_TIME ='full-time';
export const JOB_TYPE_PART_TIME = 'part-time';
export const JOB_TYPE_CONTRACT = 'contract';
export const JOB_TYPE_INTERNSHIP = 'internship';
export const JOB_TYPE_CONTRIBUTOR = 'contributor';
export const JOB_TYPE_COFOUNDER =  'co-founder';
export const JOB_TYPE_VOLUNTEER = 'volunteer';

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
   JOB_REMOTE_STATUS_REMOTE,
   JOB_REMOTE_STATUS_HYBRID,
   JOB_REMOTE_STATUS_ONSITE
];
