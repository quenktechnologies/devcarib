"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailServer = exports.OutgoingMessage = void 0;
const uuid = require("uuid");
const mailer = require("nodemailer");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const immutable_1 = require("@quenk/potoo/lib/actor/resident/immutable");
const case_1 = require("@quenk/potoo/lib/actor/resident/case");
const connection_1 = require("@quenk/tendril/lib/app/connection");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const clock_1 = require("../task/clock");
/**
 * OutgoingMessage to dispatch.
 */
class OutgoingMessage {
    constructor(to, subject, body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.id = uuid.v4().split('-').join('');
    }
}
exports.OutgoingMessage = OutgoingMessage;
/**
 * MailServer provides an actor for sending email messages via a third party
 * service.
 */
class MailServer extends immutable_1.Immutable {
    constructor(system, transport, options) {
        super(system);
        this.system = system;
        this.transport = transport;
        this.options = options;
    }
    receive() {
        return [
            (0, case_1.caseOf)(OutgoingMessage, (m) => this.queueMessage(m)),
            (0, case_1.caseOf)(clock_1.Tick, (t) => this.dispatch(t.src))
        ];
    }
    static create(s, options) {
        return new MailServer(s, mailer.createTransport({
            host: options.host,
            port: options.port,
            secure: options.port === 465,
            auth: {
                user: options.username,
                pass: options.password
            }
        }), options);
    }
    /**
     * queueMessage for dispatch later.
     */
    queueMessage(m) {
        return (0, future_1.doFuture)(function* () {
            let db = yield (0, connection_1.unsafeGetUserConnection)('main');
            let mail = db.collection('mail');
            yield (0, collection_1.insertOne)(mail, m);
            return (0, future_1.pure)(undefined);
        });
    }
    /**
     * dispatch pending mail messages.
     */
    dispatch(clock) {
        let self = this;
        return (0, future_1.doFuture)(function* () {
            let db = yield (0, connection_1.unsafeGetUserConnection)('main');
            let mail = db.collection('mail');
            let msgs = yield (0, collection_1.find)(mail, {}, { limit: self.options.maxMessagesSent });
            let work = msgs.map((msg) => (0, future_1.liftP)(() => self.transport.sendMail({
                from: self.options.username,
                to: msg.to,
                subject: msg.subject,
                html: msg.body
            })));
            yield (0, future_1.parallel)(work);
            self.tell(clock, new clock_1.Finished(self.self()));
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        this.transport = mailer.createTransport({
            host: this.options.host,
            port: this.options.port,
            secure: this.options.port === 465,
            auth: {
                user: this.options.username,
                pass: this.options.password
            }
        });
        this.tell('/clock', new clock_1.Subscribe('freq.low', this.self()));
    }
}
exports.MailServer = MailServer;
//# sourceMappingURL=server.js.map