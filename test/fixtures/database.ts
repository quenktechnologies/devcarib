import { Testkit } from '@quenk/dback-mongodb-testkit';

const opts = {

    url: process.env.MONGO_URI || 'mongodb://localhost/board-testing',

    collectionNames: ['admins', 'posts'],

    removeAllCollections: true,

    dropDatabase: true

};

export const testkit = new Testkit(opts);
