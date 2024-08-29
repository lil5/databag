import { SettingsModule } from '../src/settings';
import { NoStore } from '../src/store';
import { Crypto } from '../src/crypto';
import { ConsoleLogging } from '../src/logging';
import { defaultConfigEntity } from '../src/entities';
import { Config } from '../src/types';
import { waitFor } from '../__mocks__/waitFor';
import axios from 'redaxios';

const testConfig = JSON.parse(JSON.stringify(defaultConfigEntity));

jest.mock('redaxios', () => {
  return {
    get: jest.fn().mockImplementation(() => {
      testConfig.storageUsed = 2;
      return Promise.resolve({ status: 200, data: testConfig });
    }),
    put: jest.fn().mockImplementation((url, body) => {
      if (url == 'http://test_url/account/notification?agent=test_token') {
        testConfig.pushEnabled = body;
      }
      if (url == 'http://test_url/account/searchable?agent=test_token') {
        testConfig.searchable = body;
      }
      if (url == 'http://test_url/account/seal?agent=test_token') {
        testConfig.seal = body;
      }
      return Promise.resolve({ status: 200 });
    }),
  }
})

class TestCrypto implements Crypto {

  public pbkdfSalt() {
    return { saltHex: 'SALT_HEX' }
  }

  public pbkdfKey(saltHex: string, password: string) {
    return { aesKeyHex: 'AES_KEY_HEX' }
  }

  public aesKey() {
    return { aesKeyHex: 'AES_KEY_HEX' };
  }

  public aesIv() {
    return { ivHex: 'IV_HEX' };
  }

  public aesEncrypt(data: string, ivHex: string, aesKeyHex: string) {
    return { encryptedDataB64: 'ENCRYPTED_DATA_B64' };
  }

  public aesDecrypt(encryptedDataB64: string, ivHex: string, aesKeyHex: string) {
    return { data: 'DATA' }
  }

  public rsaKey() {
    return { publicKeyB64: 'PUBLIC_KEY_B64', privateKeyB64: 'PRIVATE_KEY_B64' };
  }

  public rsaEncrypt(data: string, publicKeyB64: string) {
    return { encryptedDataB64: 'ENCRYPTED_DATA_B64' }
  }

  public rsaDecrypt(encryptedDataB64: string, privateKeyB64: string) {
    return { data: 'DATA' }
  }
}

class TestStore extends NoStore {
  public async getProfileRevision(): Promise<number> {
    return 4;
  }
}

test('allocates session correctly', async () => {
  let config: Config | null = null;
  const log = new ConsoleLogging();
  const store = new TestStore();
  const crypto = new TestCrypto();
  const settings = new SettingsModule(log, store, crypto, 'test_guid', 'test_token', 'test_url', false);
  settings.addConfigListener((ev: Config) => { config = ev });
  settings.setRevision(5);
  await waitFor(() => (config?.storageUsed == 2));
  settings.enableRegistry();
  settings.setRevision(6);
  await waitFor(() => Boolean(config?.searchable));
  settings.disableRegistry();
  settings.setRevision(7);
  await waitFor(() => !Boolean(config?.searchable));

  settings.enableNotifications();
  settings.setRevision(8);
  await waitFor(() => Boolean(config?.pushEnabled));
  settings.disableNotifications();
  settings.setRevision(9);
  await waitFor(() => !Boolean(config?.pushEnabled));

  settings.setSeal('password');
  settings.setRevision(10);
  await waitFor(() => Boolean(config?.sealSet));
});
