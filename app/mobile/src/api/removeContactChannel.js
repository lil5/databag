import { checkResponse, fetchWithTimeout } from './fetchUtil';

export async function removeContactChannel(node: string, secure: boolean, guid: string, token: string, channelId: string) {
  const endpoint = `http${secure ? 's' : ''}://${node}/content/channels/${channelId}?contact=${guid}.${token}`;
  const status = await fetchWithTimeout(endpoint, { method: 'DELETE' });
  checkResponse(status);
}
