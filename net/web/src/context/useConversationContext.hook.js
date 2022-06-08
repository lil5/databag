import { useEffect, useState, useRef, useContext } from 'react';
import { ProfileContext } from 'context/ProfileContext';
import { CardContext } from 'context/CardContext';
import { ChannelContext } from 'context/ChannelContext';

export function useConversationContext() {

  const [state, setState] = useState({
    init: false,
    cardId: null,
    channelId: null,
    subject: null,
    contacts: null,
    members: new Set(),
    topics: new Map(),
  });

  const card = useContext(CardContext);
  const channel = useContext(ChannelContext);
  const profile = useContext(ProfileContext);
  const topics = useRef(new Map());
  const revision = useRef(null);
  const count = useRef(0);
  const conversationId = useRef(null);
  const view = useRef(0);
  const gone = useRef(false);

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }  

  const getSubject = (conversation) => {
    try {
      let subject = JSON.parse(conversation.data.channelDetail.data).subject;
      if (subject) {
        return subject;
      }
    }
    catch (err) {
      return null;
    }
  }

  const getContacts = (conversation) => {
    let members = [];
    if (conversation.guid) {
      members.push(card.actions.getCardByGuid(conversation.guid)?.data?.cardProfile?.handle);
    }
    for (let member of conversation.data.channelDetail.members) {
      let contact = card.actions.getCardByGuid(member)
      if(contact?.data?.cardProfile?.handle) {
        members.push(contact?.data?.cardProfile?.handle);
      }
    }
    return members.join(', ');
  }

  const getMembers = (conversation) => {
    let members = new Set();
    if (conversation.guid) {
      members.add(conversation.guid);
    }
    for (let member of conversation.data.channelDetail.members) {
      if (profile.state.profile.guid != member) {
        members.add(member);
      }
    }
    return members;
  }

  const setTopics = async () => {
    const { cardId, channelId } = conversationId.current;
    const curRevision = revision.current;
    const curView = view.current;

    if (cardId) {
      let deltaRevision = card.actions.getChannelRevision(cardId, channelId);
      if (!deltaRevision && !gone.current) {
        gone.current = true;
        window.alert("This converstaion has been removed");
        return;
      }
      if (curRevision != deltaRevision) {
        let conversation = card.actions.getChannel(cardId, channelId);
        let subject = getSubject(conversation);
        let contacts = getContacts(conversation);
        let members = getMembers(conversation);
        let delta = await card.actions.getChannelTopics(cardId, channelId, curRevision);
        for (let topic of delta) {
          if (topic.data == null) {
            topics.current.delete(topic.id);
          }
          else {
            let cur = topics.current.get(topic.id);
            if (cur == null) {
              cur = { id: topic.id, data: {} };
            }
            if (topic.data.detailRevision != cur.data.detailRevision) {
              if(topic.data.topicDetail) {
                cur.data.topicDetail = topic.data.topicDetail;
                cur.data.detailRevision = topic.data.detailRevision;
              }
              else {
                let slot = await card.actions.getChannelTopic(cardId, channelId, topic.id);
                cur.data.topicDetail = slot.data.topicDetail;
                cur.data.detailRevision = slot.data.detailRevision;
              }
            }
            cur.revision = topic.revision;
            topics.current.set(topic.id, cur);
          }
        }
        if (curView == view.current) {
          updateState({
            init: true,
            subject,
            contacts,
            members,
            topics: topics.current,
          });
          revision.current = deltaRevision;
        }
        else {
          topics.current = new Map();
        }
      }
    }
    else {
      let deltaRevision = channel.actions.getChannelRevision(channelId);
      if (curRevision != deltaRevision) {
        let conversation = channel.actions.getChannel(channelId);
        let subject = getSubject(conversation);
        let contacts = getContacts(conversation);
        let members = getMembers(conversation);
        let delta = await channel.actions.getChannelTopics(channelId, curRevision);
        for (let topic of delta) {
          if (topic.data == null) {
            topics.current.delete(topic.id);
          }
          else {
            let cur = topics.current.get(topic.id);
            if (cur == null) {
              cur = { id: topic.id, data: {} };
            }
            if (topic.data.detailRevision != cur.data.detailRevision) {
              if(topic.data.topicDetail != null) {
                cur.data.topicDetail = topic.data.topicDetail;
                cur.data.detailRevision = topic.data.detailRevision;
              }
              else {
                let slot = await channel.actions.getChannelTopic(channelId, topic.id);
                cur.data.topicDetail = slot.data.topicDetail;
                cur.data.detailRevision = slot.data.detailRevision;
              }
            }
            cur.revision = topic.revision;
            topics.current.set(topic.id, cur);
          }
        }
        if (curView == view.current) {
          updateState({
            init: true,
            subject,
            contacts,
            members,
            topics: topics.current,
          });
          revision.current = deltaRevision;
        }
        else {
          topics.current = new Map();
        }
      }
    }
  }

  const updateConversation = async () => {

    if (!card.state.init || !channel.state.init) {
      return;
    }

    const { cardId } = conversationId.current;
    if (cardId && card.state.cards.get(cardId)?.data.cardDetail.status != 'connected') {
      window.alert("You are disconnected from the host");
      conversationId.current = null;
      return;
    }

    if (count.current == 0) {
      count.current += 1;
      while(count.current > 0) {
        try {
          await setTopics();
        }
        catch (err) {
          console.log(err);
        }
        count.current -= 1;
      }
    }
    else {
      count.current += 1;
    }
  };

  useEffect(() => {
    if (conversationId.current != null) {
      updateConversation();
    }
  }, [card, channel]);

  const actions = {
    setConversationId: (cardId, channelId) => {
      view.current += 1;
      conversationId.current = { cardId, channelId };
      revision.current = null;
      gone.current = false;
      topics.current = new Map();
      updateState({ init: false, subject: null, cardId, channelId, topics: topics.current });
      updateConversation();
    },
    setChannelSubject: async (subject) => {
      return await channel.actions.setChannelSubject(conversationId.current.channelId, subject);
    },
    setChannelCard: async (cardId) => {
      return await channel.actions.setChannelCard(conversationId.current.channelId, cardId);
    },
    clearChannelCard: async (cardId) => {
      return await channel.actions.clearChannelCard(conversationId.current.channelId, cardId);
    },
    getAssetUrl: (topicId, assetId) => {
      const { cardId, channelId } = conversationId.current;
      if (conversationId.current.cardId) {
        return card.actions.getContactChannelTopicAssetUrl(cardId, channelId, topicId, assetId);
      }
      else {
        return channel.actions.getChannelTopicAssetUrl(channelId, topicId, assetId);
      }
    },
    removeConversation: async () => {
      const { cardId, channelId } = conversationId.current;
      if (cardId) {
        return await card.actions.removeChannel(cardId, channelId);
      }
      else {
        return await channel.actions.removeChannel(channelId);
      }
    },
    removeTopic: async (topicId) => {
      const { cardId, channelId } = conversationId.current;
      if (cardId) {
        return await card.actions.removeChannelTopic(cardId, channelId, topicId);
      }
      else {
        return await channel.actions.removeChannelTopic(channelId, topicId);
      }
    },
    setTopicSubject: async (topicId, data) => {
console.log("DATA:", data);
      const { cardId, channelId } = conversationId.current;
      if (cardId) {
        return await card.actions.setChannelTopicSubject(cardId, channelId, topicId, data);
      }
      else {
        return await channel.actions.setChannelTopicSubject(channelId, topicId, data);
      }
    }
  }

  return { state, actions }
}

