import { EventEmitter } from 'events';

import { AccountModule } from './account';
import { ProfileModule } from './profile';
import { ContactModule } from './contact';
import { GroupModule } from './group';
import { AttributeModule } from './attribute';
import { ChannelModule } from './channel';

import { type Session, type SqlStore, type WebStore, type Account, type Profile, type Contact, type Group, type Attribute, type Channel } from './types';

export class SessionModule implements Session {

  private statusEmitter: EventEmitter;
  private store: SqlStore | WebStore | null;
  private token: string;
  private url: string;
  private sync: boolean;

  public account: AccountModule; 
  public profile: ProfileModule;
  public contact: ContactModule;
  public group: GroupModule;
  public attribute: AttributeModule;
  public channel: ChannelModule; 

  constructor(store: SqlStore | WebStore | null, token: string, url: string) {
    this.store = store;
    this.token = token;
    this.url = url;
    this.sync = true;
    this.statusEmitter = new EventEmitter();
    this.account = new AccountModule(token, url, this.setSync);
    this.profile = new ProfileModule(token, url, this.setSync);
    this.contact = new ContactModule(token, url, this.setSync);
    this.group = new GroupModule(token, url, this.setSync);
    this.attribute = new AttributeModule(token, url, this.setSync);
    this.channel = new ChannelModule(token, url, this.setSync);
  }

  public addStatusListener(ev: (status: string) => void): void {
    this.statusEmitter.on('status', ev);
  }

  public removeStatusListener(ev: (status: string) => void): void {
    this.statusEmitter.off('status', ev);
  }

  public setSync(sync: boolean) {
    this.sync = sync;
    // update status
  }

  public resync() {
  }

  public getAccount(): Account {
    return this.account;
  }

  public getProfile(): Profile {
    return this.profile;
  }

  public getContact(): Contact {
    return this.contact;
  }

  public getGroup(): Group {
    return this.group;
  }

  public getAttribute(): Attribute {
    return this.attribute;
  }

  public getChannel(): Channel {
    return this.channel;
  }
}
