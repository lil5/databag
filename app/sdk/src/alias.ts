import { EventEmitter } from 'events';
import type { Alias, Account } from './api';
import type { Group } from './types';

export class AliasModule implements Alias {

  private token: string;
  private url: string;
  private sync: (flag: boolean) => void;
  private account: Account;
  private emitter: EventEmitter;

  constructor(token: string, url: string, sync: (flag: boolean) => void, account: Account) {
    this.token = token;
    this.url = url;
    this.sync = sync;
    this.account = account;
    this.emitter = new EventEmitter();
  }

  public addGroupListener(ev: (groups: Group[]) => void): void {
    this.emitter.on('group', ev);
  }

  public removeGroupListener(ev: (groups: Group[]) => void): void {
    this.emitter.off('group', ev);
  }

  public close(): void {
  }

  public async setRevision(rev: number): Promise<void> {
  }

  public async resync(): Promise<void> {
  }

  public async addGroup(sealed: boolean, dataType: string, subject: string, cardIds: string[]): Promise<string> {
    return '';
  }

  public async removeGroup(groupId: string): Promise<void> {
  }

  public async setGroupSubject(groupId: string, subject: string): Promise<void> {
  }

  public async setGroupCard(groupId: string, cardId: string): Promise<void> {
  }

  public async clearGroupCard(groupId: string, cardId: string): Promise<void> {
  }

  public async compare(groupIds: string[], cardIds: string[]): Promise<Map<string, string[]>> {
    return new Map<string, string[]>();
  }
}

