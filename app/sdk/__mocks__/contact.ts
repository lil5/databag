import { EventEmitter } from 'eventemitter3';
import type { Contact } from '../src/api';
import type { Card, Topic, Asset, Tag, Profile, Participant} from '../src/types';

export class MockContactModule implements Contact {

  public revision: number;
  private emitter: EventEmitter;

  constructor() {
    this.revision = 0;
    this.emitter = new EventEmitter();
  }

  public addCardListener(ev: (cards: Card[]) => void): void {
    this.emitter.on('card', ev);
  }

  public removeCardListener(ev: (cards: Card[]) => void): void {
    this.emitter.off('card', ev);
  }

  public close(): void {
  }

  public async setRevision(rev: number): Promise<void> {
    this.revision = rev;
  }

  public async addCard(server: string, guid: string): Promise<string> {
    return '';
  }

  public async removeCard(cardId: string): Promise<void> {
  }

  public async confirmCard(cardId: string): Promise<void> {
  }

  public async connectCard(cardId: string): Promise<void> {
  }

  public async disconnectCard(cardId: string): Promise<void> {
  }

  public async rejectCard(cardId: string): Promise<void> {
  }

  public async ignoreCard(cardId: string): Promise<void> {
  }

  public async resyncCard(cardId: string): Promise<void> {
  }

  public async flagCard(cardId: string): Promise<void> {
  }

  public async flagArticle(cardId: string, articleId: string): Promise<void> {
  }

  public async flagChannel(cardId: string, channelId: string): Promise<void> {
  }

  public async flagTopic(cardId: string, channelId: string, topicId: string): Promise<void> {
  }

  public async flagTag(cardId: string, channelId: string, topicId: string, tagId: string): Promise<void> {
  }

  public async setBlockCard(cardId: string): Promise<void> {
  }

  public async setBlockArticle(cardId: string, articleId: string): Promise<void> {
  }

  public async setBlockChannel(cardId: string, channelId: string): Promise<void> {
  }

  public async setBlockTopic(cardId: string, channelId: string, topicId: string): Promise<void> {
  }

  public async setBlockTag(cardId: string, channelId: string, topicId: string, tagId: string): Promise<void> {
  }

  public async clearBlockCard(cardId: string): Promise<void> {
  }

  public async clearBlockArticle(cardId: string, articleId: string): Promise<void> {
  }

  public async clearBlockChannel(cardId: string, channelId: string): Promise<void> {
  }

  public async clearBlockTopic(cardId: string, channelId: string, topicId: string): Promise<void> {
  }

  public async clearBlockTag(cardId: string, channelId: string, topicId: string, tagId: string): Promise<void> {
  }

  public async getBlockedCards(): Promise<{ cardId: string }[]> {
    return [];
  }

  public async getBlockedChannels(): Promise<{ cardId: string, channelId: string }[]> {
    return [];
  }

  public async getBlockedTopics(): Promise<{ cardId: string, channelId: string, topicId: string }[]> {
    return [];
  }

  public async getBlockedTags(): Promise<{ cardId: string, channelId: string, topicId: string, tagId: string }[]> {
    return [];
  }

  public async getBlockedArticles(): Promise<{ cardId: string, articleId: string }[]> {
    return [];
  }

  public async enableChannelNotifications(cardId: string, channelId: string): Promise<void> {
  }

  public async disableChannelNotifications(cardId: string, channelId: string): Promise<void> {
  }

  public async removeArticle(cardId: string, articleId: string): Promise<void> {
  }

  public async removeChannel(cardId: string, channelId: string): Promise<void> {
  }

  public async addTopic(cardId: string, channelId: string, type: string, message: string, assets: Asset[]): Promise<string> {
    return '';
  }

  public async removeTopic(cardId: string, channelId: string, topicId: string): Promise<void> {
  }

  public async setTopicSubject(cardId: string, channelId: string, topicId: string, subject: string): Promise<void> {
  }

  public async setTopicSort(cardId: string, channelId: string, topicId: string, sort: number): Promise<void> {
  }

  public async addTag(cardId: string, channelId: string, topicId: string, type: string, value: string): Promise<string> {
    return '';
  }

  public async removeTag(cardId: string, channelId: string, topicId: string, tagId: string): Promise<void> {
  }

  public async setTagSubject(cardId: string, channelId: string, topicId: string, tagId: string, subject: string): Promise<void> {
  }

  public async setTagSort(cardId: string, channelId: string, topicId: string, tagId: string, sort: number): Promise<void> {
  }

  public async getTopics(cardId: string, channelId: string): Promise<Topic[]> {
    return [];
  }

  public async getMoreTopics(cardId: string, channelId: string): Promise<Topic[]> {
    return [];
  }

  public async getTags(cardId: string, channelId: string, topicId: string): Promise<Tag[]> {
    return [];
  }

  public async getMoreTags(cardId: string, channelId: string, topicId: string): Promise<Tag[]> {
    return [];
  }

  public async setUnreadChannel(cardId: string, channelId: string): Promise<void> {
  }

  public async clearUnreadChannel(cardId: string, channelId: string): Promise<void> {
  }  

  public async getRegistry(server: string): Promise<Profile[]> {
    return [];
  }

  public getRegistryImageUrl(server: string, guid: string): string {
    return '';
  }

  public getTopicAssetUrl(cardId: string, channelId: string, topicId: string, assetId: string): string {
    return '';
  }

  public getCardImageUrl(cardId: string): string {
    return '';
  }

  public async addParticipantAccess(cardId: string, channelId: string, name: string): Promise<Participant> {
    return { id: '', name: '', node: '', secure: false, token: '' };
  }

  public async removeParticipantAccess(cardId: string, channelId: string, participantId: string): Promise<void> {
  }

}

