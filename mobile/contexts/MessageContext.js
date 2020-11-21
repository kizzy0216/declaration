import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import { useQuery, useSubscription } from 'urql';
import { resetSubscriptionClient } from '../utils/api';

import GetMessageChannels from '../queries/GetMessageChannels';
import { UserContext } from './UserContext';
import { NetworkContext } from './NetworkContext';

export const MessageContext = createContext({
  loops: [],
  conversations: [],
  isFetchingItems: false,
  onlineUsers: [],
  refresh: () => {},
});

const OnlineSubscription = `
subscription OnlineSubscription {
  online_users_view {
    uuid
  }
}
`

export const MessageContextProvider = ({ children }) => {
  const [loops, setLoops] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { user, hasSettled } = useContext(UserContext);
  
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { activeNetwork } = useContext(NetworkContext);

  const [getChannelsResult, refreshChannelResult] = useQuery({
    query: GetMessageChannels,
    variables: {
      user_uuid: user.uuid,
      network_uuid: activeNetwork.uuid
    },
    pause: !activeNetwork || !activeNetwork.uuid || !user || !user.uuid
  });

  useEffect(() => {
    // console.log('SETTLED', hasSettled)
    resetSubscriptionClient(!hasSettled)
  }, [hasSettled]);

  useEffect(() => {
    if (getChannelsResult.error) {
      console.error('CHANNEL RESULTS ERROR', getChannelsResult.error)
    }
    if (getChannelsResult.data) {
      // console.log('CHANNEL DATA', getChannelsResult.data)
      setLoops(getChannelsResult.data.loop)
      setConversations(getChannelsResult.data.conversation)
    }
  }, [getChannelsResult.data, getChannelsResult.error]);

  useSubscription({
    query: OnlineSubscription,
    pause: !user || !user.uuid
  }, (_, result) => {
      // console.log('Online users result for', user.name, new Date(), result.online_users_view.map(x => x.uuid))
      setOnlineUsers(result.online_users_view.map(x => x.uuid))
  })

  function refreshChannels() {
    // console.log('REFRESH DATA', new Date(), getChannelsResult)
    refreshChannelResult({ requestPolicy: 'network-only' })
  }

  return (
    <MessageContext.Provider
      value={{
        loops,
        conversations,
        isFetchingItems: getChannelsResult.fetching,
        onlineUsers,
        refresh: refreshChannels,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
