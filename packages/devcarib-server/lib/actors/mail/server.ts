import * as mongo from 'mongodb';
import * as uuid from 'uuid';
import * as mailer from 'nodemailer';

import { doFuture, liftP, parallel, pure } from '@quenk/noni/lib/control/monad/future';

import { Immutable } from '@quenk/potoo/lib/actor/resident';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { Address } from '@quenk/potoo/lib/actor/address';
import { System } from '@quenk/potoo/lib/actor/system';

import { unsafeGetUserConnection } from '@quenk/tendril/lib/app/connection';

import { insertOne, find } from '@quenk/noni-mongodb/lib/database/collection';
import { Finished, Subscribe, Tick } from '../task/clock';

/**
 * Message type of the MailServer actor.
 */
export type Message
    = OutgoingMessage
    | Tick
    ;

/**
 * MailServerOptions used to connect to the external service and send emails.
 */
export interface MailServerOptions {

    /**
     * host name of the external service.
     */
    host: string,

    /**
     * port to connect to.
     */
    port: number,

    /**
     * username to use.
     */
    username: string,

    /**
     * password for the username.
     */
    password: string,

    /**
     * maxMessageSent per dispatch tick.
     */
    maxMessagesSent: number

}

/**
 * OutgoingMessage to dispatch.
 */
export class OutgoingMessage {

    id = uuid.v4().split('-').join('');

    constructor(
        public to: string,
        public subject: string,
        public body: string) { }

}

/**
 * MailServer provides an actor for sending email messages via a third party
 * service.
 */
export class MailServer extends Immutable<Message>{

    constructor(
        public system: System,
        public transport: mailer.Transporter,
        public options: MailServerOptions) { super(system); }

    receive() {

        return  <Case<Message>[]>[

        new Case(OutgoingMessage, (m: OutgoingMessage) => this.queueMessage(m)),

        new Case(Tick, (t: Tick) => this.dispatch(t.src))

    ];

    }

    static create(s: System, options: MailServerOptions) {

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
    queueMessage(m: OutgoingMessage) {

        return doFuture(function*() {

            let db: mongo.Db = yield unsafeGetUserConnection('main');

            let mail = db.collection('mail');

            yield insertOne(mail, m);

            return pure(undefined);

        });

    }

    /**
     * dispatch pending mail messages.
     */
    dispatch(clock: Address) {

        let self = this;

        return doFuture(function*() {

            let db: mongo.Db = yield unsafeGetUserConnection('main');

            let mail = db.collection('mail');

            let msgs = yield find<OutgoingMessage>(mail, {},
                { limit: self.options.maxMessagesSent });

            let work = msgs.map((msg: OutgoingMessage) =>
                liftP(() => self.transport.sendMail({

                    from: self.options.username,

                    to: msg.to,

                    subject: msg.subject,

                    html: msg.body

                })));

            yield parallel(work);

            self.tell(clock, new Finished(self.self()));

            return pure(undefined);

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

        this.tell('/clock', new Subscribe('freq.low', this.self()));

    }

}
