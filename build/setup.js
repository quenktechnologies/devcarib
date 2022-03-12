"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.Setup = exports.SETTINGS_ID = exports.E_NO_ADMIN_CREDS = exports.VERSION = exports.ADMIN_PWD = exports.ADMIN_EMAIL = void 0;
const moment = require("moment");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const monad_1 = require("@quenk/noni/lib/control/monad");
const collection_1 = require("@quenk/safe-mongodb/lib/database/collection");
const admin_1 = require("@mia/checks/lib/admin");
exports.ADMIN_EMAIL = 'ADMIN_EMAIL';
exports.ADMIN_PWD = 'ADMIN_PASSWORD';
exports.VERSION = '0.0.1';
exports.E_NO_ADMIN_CREDS = 'Cannot continue installation, admin credentials missing!';
exports.SETTINGS_ID = 'main';
/**
 * Setup script.
 */
class Setup {
    constructor(app) {
        this.app = app;
    }
    isInstalled(db) {
        return (0, monad_1.doN)(function* () {
            let settings = db.collection('settings');
            let mhit = yield (0, collection_1.findOne)(settings, { id: exports.SETTINGS_ID });
            return (0, future_1.pure)(mhit.isJust());
        });
    }
    installAdminUser(db) {
        // TODO: Move to mia
        return (0, monad_1.doN)(function* () {
            let name = 'Administrator';
            let email = process.env[exports.ADMIN_EMAIL];
            let password = process.env[exports.ADMIN_PWD];
            if ((email == null) || (password == null))
                return (0, future_1.raise)(new Error(exports.E_NO_ADMIN_CREDS));
            let eAdmin = yield (0, admin_1.check)({
                name,
                email,
                password,
            });
            if (eAdmin.isLeft()) {
                let err = JSON.stringify(eAdmin.takeLeft().explain({}));
                return (0, future_1.raise)(new Error(`Could not install admin user: \n ${err}`));
            }
            let admins = db.collection('admins');
            let admin = eAdmin.takeRight();
            admin.id = 1;
            return (0, collection_1.insertOne)(admins, admin);
        });
    }
    /**
     * installSettings
     */
    installSettings(db) {
        return (0, monad_1.doN)(function* () {
            let settings = db.collection('settings');
            yield (0, collection_1.insertOne)(settings, newSettings());
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        let { app } = this;
        let that = this;
        return (0, monad_1.doN)(function* () {
            let db = yield getMain(app);
            let yes = yield that.isInstalled(db);
            if (!yes) {
                yield that.installAdminUser(db);
                yield that.installSettings(db);
            }
            return (0, future_1.pure)(undefined);
        });
    }
}
exports.Setup = Setup;
const newSettings = () => ({
    id: exports.SETTINGS_ID,
    installation: {
        successful: true,
        date: moment.utc().toDate(),
        version: exports.VERSION
    },
    counters: {}
});
const getMain = (app) => app.pool.get('main')
    .map(c => c.checkout())
    .orJust(() => connectionNotFoundErr())
    .map(f => f)
    .get();
const connectionNotFoundErr = () => (0, future_1.raise)(new Error('setup: main connection not found!'));
/**
 * run
 */
const run = (app) => new Setup(app).run();
exports.run = run;
//# sourceMappingURL=setup.js.map