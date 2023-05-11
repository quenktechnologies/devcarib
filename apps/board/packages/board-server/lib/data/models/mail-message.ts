/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */
import { MailMessage } from '@board/types/lib/mail-message';
import * as mongodb from 'mongodb';
import { BaseModel } from '@quenk/dback-model-mongodb';


export {
  MailMessageModel as ModelImpl,
  MailMessage as DataType
}

/**
 * MailMessageModelModel for MailMessage (AUTOGENERATED).
 */
export class MailMessageModel extends BaseModel<MailMessage> {

  constructor(
    public name: string,
    public database: mongodb.Db,
    public collection : mongodb.Collection) { super(database, collection); }

    id = 'id';

  static getInstance (db: mongodb.Db) : MailMessageModel {

    return new MailMessageModel('mail', db, db.collection('mail'));

  }

}
