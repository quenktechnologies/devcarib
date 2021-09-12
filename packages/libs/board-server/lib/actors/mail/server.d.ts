import * as mailer from 'nodemailer';
import { Immutable } from '@quenk/potoo/lib/actor/resident';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { Address } from '@quenk/potoo/lib/actor/address';
import { System } from '@quenk/potoo/lib/actor/system';
import { Tick } from '../task/clock';
/**
 * Message type of the MailServer actor.
 */
export declare type Message = OutgoingMessage | Tick;
/**
 * MailServerOptions used to connect to the external service and send emails.
 */
export interface MailServerOptions {
    /**
     * host name of the external service.
     */
    host: string;
    /**
     * port to connect to.
     */
    port: number;
    /**
     * username to use.
     */
    username: string;
    /**
     * password for the username.
     */
    password: string;
    /**
     * maxMessageSent per dispatch tick.
     */
    maxMessagesSent: number;
}
/**
 * OutgoingMessage to dispatch.
 */
export declare class OutgoingMessage {
    to: string;
    subject: string;
    body: string;
    id: string;
    constructor(to: string, subject: string, body: string);
}
/**
 * MailServer provides an actor for sending email messages via a third party
 * service.
 */
export declare class MailServer extends Immutable<Message> {
    system: System;
    transport: mailer.Transporter;
    options: MailServerOptions;
    constructor(system: System, transport: mailer.Transporter, options: MailServerOptions);
    receive: Case<Message>[];
    static create(s: System, options: MailServerOptions): MailServer;
    /**
     * queueMessage for dispatch later.
     */
    queueMessage(m: OutgoingMessage): import("@quenk/noni/lib/control/monad/future").Future<undefined>;
    /**
     * dispatch pending mail messages.
     */
    dispatch(clock: Address): import("@quenk/noni/lib/control/monad/future").Future<undefined>;
    run(): void;
}
