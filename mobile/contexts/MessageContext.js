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
  refreshChannels: () => {},
});

export const MessageContextProvider = ({ children }) => {
  const [loops, setLoops] = useState([]);
  const [conversations, setConversations] = useState([]);
  const { user, hasSettled } = useContext(UserContext);

  const [getChannelsResult, getChannels] = useQuery({
    query: GetMessageChannelsQuery,
    variables: {
      user_uuid: user.uuid,
    }
  });

  React.useEffect(() => {
    if (hasSettled) {
      console.log('GET CONVERSATIONS')
      console.log('GET LOOPS')
    }
    console.log('RESET SUBSCRIPTION')
    // resetSubscriptionClient(!hasSettled)
  }, [hasSettled]);


  // when a fetched user is returned, save it in local state, and persist it in
  // global state
  useEffect(() => {
    console.log('CHANNEL RESULTT', getChannelsResult)
    if (getChannelsResult.data) {
      console.log('CHANNEL DATA', getChannelsResult.data)
    }
  }, [getChannelsResult.data]);

  function refreshChannels() {
    // getUser({ requestPolicy: 'network-only' });
  }

  return (
    <MessageContext.Provider
      value={{
        loops,
        conversations,
        refreshChannels,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
