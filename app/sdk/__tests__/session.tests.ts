import { DatabagSDK } from '../src/index';
import { type SessionParams } from '../src/types';

test('allocates session correctly', async () => {
  const sdk = new DatabagSDK(null);
  const params: SessionParams = { topicBatch: 0, tagBatch: 0, channelTypes: [] };
  const session = await sdk.login('handle', 'password', 'url', params);
  const account = session.getAccount();
  account.setNotifications(true);
  //expect(r).toBe(5);
});
