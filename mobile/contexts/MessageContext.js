import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import { useQuery, useSubscription } from 'urql';
import { resetSubscriptionClient } from '../utils/api';

// import GetUser from '~/queries/GetUser';
import GetMessagesQuery from '~/queries/GetMessagesQuery'
import GetMessageChannelsQuery from '../queries/GetMessageChannelsQuery';
import { UserContext } from './UserContext';
import { NetworkContext } from './NetworkContext';
// import mapUser from '@shared/mappings/mapUser';
// import mapNetwork from '@shared/mappings/mapNetwork';
// import {
//   saveJWT,
//   hydrateJWT,
//   saveUser,
//   loadUser,
// } from '~/utils/api';

export const MessageContext = createContext({
  loops: [],
  conversations: [],
  refresh: () => {},
});

export const MessageContextProvider = ({ children }) => {
  const [loops, setLoops] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { user, hasSettled } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);

  const [getChannelsResult, refreshChannelResult] = useQuery({
    query: GetMessageChannelsQuery,
    variables: {
      user_uuid: user.uuid,
      network_uuid: activeNetwork.uuid
    },
    pause: !activeNetwork || !activeNetwork.uuid || !user || !user.uuid
  });

  useEffect(() => {
    console.log('SETTLED', hasSettled)
    resetSubscriptionClient(!hasSettled)
  }, [hasSettled]);

  useEffect(() => {
    console.log('CHANNEL RESULTT', getChannelsResult)
    if (getChannelsResult.data) {
      console.log('CHANNEL DATA', getChannelsResult.data)
    }
  }, [getChannelsResult.data, getChannelsResult.error]);

  function refreshChannels() {
    console.log('REFRESH DATA', new Date(), getChannelsResult)
    refreshChannelResult({ requestPolicy: 'network-only' })
  }

  return (
    <MessageContext.Provider
      value={{
        loops,
        conversations,
        isFetchingItems: getChannelsResult.fetching,
        refresh: refreshChannels,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
