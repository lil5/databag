import { useState, useEffect, useRef, useContext } from 'react';
import { StoreContext } from 'context/StoreContext';
import { UploadContext } from 'context/UploadContext';
import { CardContext } from 'context/CardContext';
import { ChannelContext } from 'context/ChannelContext';
import { ProfileContext } from 'context/ProfileContext';
import CryptoJS from 'crypto-js';

export function useConversationContext() {
  const COUNT = 64;

  const [state, setState] = useState({
    offsync: false,
    topics: new Map(),
    card: null,
    channel: null,
    notification: null,
  });
  const card = useContext(CardContext);
  const channel = useContext(ChannelContext);

  const reset = useRef(false);
  const more = useRef(false);
  const force = useRef(false);
  const syncing = useRef(false);
  const update = useRef(false);
  const loaded = useRef(false);
  const conversationId = useRef(null);
  const topics = useRef(new Map());

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }))
  }

  const sync = async () => {

    if (!syncing.current && (reset.current || update.current || force.current || more.current)) {
      const loadMore = more.current;
      const ignoreRevision = force.current;
      const conversation = conversationId.current;
      let curRevision, setRevision, marker;

      syncing.current = true;
      update.current = false;
      force.current = false;
      more.current = false;

      if (reset.current) {
        reset.current = false;
        loaded.current = false;
        topics.current = new Map();
        
        let notification;
        try {
          notification = await getNotifications();
        }
        catch(err) {
          console.log(err);
        }
         
        updateState({ offsync: false, channel: null, card: null, topics: topics.current, notification });
      }

      if (conversation) {
        const { cardId, channelId } = conversation;
        const cardValue = cardId ? card.state.cards.get(cardId) : null;
        const channelValue = cardId ? cardValue?.channels.get(channelId) : channel.state.channels.get(channelId);

        if (channelValue) {
          const { topicRevision, syncRevision, topicMarker } = channelValue;

          curRevision = topicRevision;
          setRevision = syncRevision;
          marker = topicMarker;
          updateState({ card: cardValue, channel: channelValue });

          if (!loaded.current) {
            const topicItems = await getTopicItems(cardId, channelId);
            for (let topic of topicItems) {
              topics.current.set(topic.topicId, topic);
            }
            updateState({ offsync: false, topics: topics.current });
            loaded.current = true;
          }
        }
        else {
          console.log("failed to load conversation");
          syncing.current = false;
          return;
        }

        if (ignoreRevision || curRevision !== setRevision) {
          try {
            if (!marker) {
              const delta = await getTopicDelta(cardId, channelId, null, COUNT, null, null);
              await setTopicDelta(cardId, channelId, delta.topics);
              await setMarkerAndSync(cardId, channelId, delta.marker, curRevision);
            }
            if (loadMore && marker) {
              const delta = await getTopicDelta(cardId, channelId, null, COUNT, null, marker);
              await setTopicDelta(cardId, channelId, delta.topics);
              await setTopicMarker(cardId, channelId, delta.marker);
            }
            if (ignoreRevision || curRevision !== setRevision) {
              const delta = await getTopicDelta(cardId, channelId, setRevision, null, marker, null);
              await setTopicDelta(cardId, channelId, delta.topics);
              await setSyncRevision(cardId, channelId, curRevision);
            }
          }
          catch(err) {
            console.log(err);
            updateState({ offysnc: true });
            syncing.current = false;
            return
          }
        }
      }

      syncing.current = false;
      await sync();
    }
  }

  const setTopicDelta = async (cardId, channelId, entries) => {
    for (let entry of entries) {
      if (entry.data) {
        if (entry.data.detail) {
          const item = mapTopicEntry(entry);
          setTopicItem(cardId, channelId, item);
          topics.current.set(item.topicId, item);
        }
        else {
          const topic = await getTopic(cardId, channelId, entry.id);
          const item = mapTopicEntry(entry);
          setTopicItem(cardId, channelId, item);
          topics.current.set(item.topicId, item);
        }
      }
      else {
        topics.current.delete(entry.id);
        clearTopicItem(entry.id);
      }
    }
    updateState({ offsync: false, topics: topics.current });
  }

  useEffect(() => {
    update.current = true;
    sync();
    // eslint-disable-next-line
  }, [card.state, channel.state]);

  const actions = {
    setConversation: async (cardId, channelId) => {
      conversationId.current = { cardId, channelId };
      reset.current = true;
      await sync();
    },
    clearConversation: async () => {
      conversationId.current = null;
      reset.current = true;
    },
    setChannelSubject: async (type, subject) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        throw new Error("can only set hosted channel subjects");
      }
      else if(channelId) {
        await channel.actions.setChannelSubject(channelId, type, subject);
      }
    },
    removeChannel: async () => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.removeChannel(cardId, channelId); 
      }
      else if (channelId) {
        await channel.actions.removeChannel(channelId);
      }
    },
    setNotifications: async (notification) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.setChannelNotifications(cardId, channelId, notification);
      }
      else if (channelId) {
        await channel.actions.setNotifications(channelId, notification);
      }
      updateState({ notification });
    },
    setChannelCard: async (id) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        throw new Error("can only set members on hosted channel");
      }
      else if (channelId) {
        await channel.actions.setChannelCard(channelId, id);
      }
    },
    clearChannelCard: async (id) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        throw new Error("can only clear members on hosted channel");
      }
      else if (channelId) {
        await channel.actions.clearChannelCard(channelId, id);
      }
    },
    setChannelReadRevision: async (revision) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.setChannelReadRevision(cardId, channelId, revision);
      }
      else if (channelId) {
        await channel.actions.setReadRevision(channelId, revision);
      }
    },
    addChannelAlert: async () => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        return await card.actions.addChannelAlert(cardId, channelId);
      }
      else if (channelId) {
        return await channel.actions.addChannelAlert(channelId);
      }
    },
    setChannelFlag: async () => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.setChannelFlag(cardId, channelId);
      }
      else if (channelId) {
        await channel.actions.setChannelFlag(channelId);
      }
    },
    clearChannelFlag: async () => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardid) {
        await card.actions.clearChannelFlag(cardId, channelId);
      }
      else if (channelId) {
        await channel.actions.clearChannelFlag(channelId);
      }
    },
    addTopic: async (type, message, files) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.addTopic(cardId, channelId, type, message, files);
      }
      else if (channelId) {
        await channel.actions.addTopic(channelId, type, message, files);
      }
      force.current = true;
      await sync();
    },
    removeTopic: async (topicId) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.removeTopic(cardId, channelId, topicId);
      }
      else {
        await channel.actions.removeTopic(channelId, topicId);
      }
      force.current = true;
      await sync();
    },
    unsealTopic: async (topicId, revision, unsealed) => {
      const { cardId, channelId } = conversationId.current || {}
      if (cardId) {
        await card.actions.setUnsealedTopicSubject(cardId, channelId, topicId, revision, unsealed);
      }
      else if (channelId) {
        await channel.actions.setUnsealedTopicSubject(channelId, topicId, revision, unsealed);
      }
      setTopicField(topicId, 'unsaledDetail', unsealed);
    },
    setTopicSubject: async (topicId, type, subject) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        await card.actions.setTopicSubject(cardId, channelId, topicId, type, subject);
      }
      else if (channelId) {
        await channel.actions.setTopicSubject(channelId, topicId, type, subject);
      }
      force.current = true;
      await sync();
    },
    addTopicAlert: async (topicId) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        return await card.actions.addTopicAlert(cardId, channelId, topicId);
      }
      else if (channelId) {
        return await channel.actions.addTopicAlert(channelId, topicId);
      }
    },
    setTopicFlag: async (topicId) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        card.actions.setTopicFlag(cardId, channelId, topicId);
      }
      else if (channelId) {
        channel.actions.setTopicFlag(channelId, topicId);
      }
      setTopicField(topicId, 'blocked', true);
    },
    clearTopicFlag: async (topicId) => {
      const { cardId, channelId } = conversationId.current || {};
      if (cardId) {
        card.actions.clearTopicFlag(cardId, channelId, topicId);
      }
      else if (channelId) {
        channel.actions.clearTopicFlag(channelId, topicId);
      }
      setTopicField(topicId, 'blocked', false);
    },
    getTopicAssetUrl: (topicId, assetId) => {
      const { cardId, channelId } = conversationId.current || {};
      return getTopicAssetUrl(cardId, channelId, topicId, assetId);
    },
    loadMore: () => {
      more.current = true;
      sync();
    },
    resync: () => {
      force.current = true;
      sync();
    },
  }

  const getTopicItems = async (cardId, channelId) => {
    if (cardId) {
      return await card.actions.getTopicItems(cardId, channelId);
    }
    return await channel.actions.getTopicItems(channelId);
  }

  const setTopicItem = async (cardId, channelId, topic) => {
    if (cardId) {
      return await card.actions.setTopicItem(cardId, channelId, topic);
    }
    return await channel.actions.setTopicItem(channelId, topic);
  }

  const clearTopicItem = async (cardId, channelId, topicId) => {
    if (cardId) {
      return await card.actions.clearTopicItem(cardId, channelId, topicId);
    }
    return await channel.actions.clearTopicItem(channelId, topicId);
  }

  const setTopicMarker = async (cardId, channelId, marker) => {
    if (cardId) {
      return await card.actions.setChannelTopicMarker(cardId, channelId, marker);
    }
    return await channel.actions.setTopicMarker(channelId, marker);
  }

  const setSyncRevision = async (cardId, channelId, revision) => {
    if (cardId) {
      return await card.actions.setChannelSyncRevision(cardId, channelId, revision);
    }
    return await channel.actions.setSyncRevision(channelId, revision);
  }

  const setMarkerAndSync = async (cardId, channelId, marker, revision) => {
    if (cardId) {
      return await card.actions.setChannelMarkerAndSync(cardId, channelId, marker, revision);
    }
    return await channel.actions.setMarkerAndSync(channelId, marker, revision);
  }

  const getTopicDelta = async (cardId, channelId, revision, count, begin, end) => {
    if (cardId) {
      return await card.actions.getTopics(cardId, channelId, revision, count, begin, end);
    }
    return await channel.actions.getTopics(channelId, revision, count, begin, end);
  }

  const getTopic = async (cardId, channelId, topicId) => {
    if (cardId) {
      return await card.actions.getTopic(cardId, channelId, topicId);
    }
    return await channel.actions.getTopic(channelId, topicId);
  }

  const getNotifications = async (notification) => {
    const { cardId, channelId } = conversationId.current || {};
    if (cardId) {
      return await card.actions.getChannelNotifications(cardId, channelId);
    }
    else if (channelId) {
      return await channel.actions.getNotifications(channelId);
    }
  }

  const mapTopicEntry = (entry) => {
    return {
      topicId: entry.id,
      revision: entry.revision,
      detailRevision: entry.data?.detailRevision,
      detail: entry.data?.topicDetail,
    };
  };

  const setTopicField = (topicId, field, value) => {
    const topic = topics.current.get(topicId);
    if (topic) {
      topic[field] = value;
    }
    topics.current.set(topicId, { ...topic });
    updateState({ topics: topics.current });
  };

  return { state, actions }
}

