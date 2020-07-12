import * as Linking from 'expo-linking';

console.log(Linking.makeUrl('/'));

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      initialRouteName: 'Feed',
      screens: {
        Feed: 'feed',
        Create: 'create',
      },
    },
    AuthenticationRoot: {
      initialRouteName: 'AuthenticationLogIn',
      screens: {
        AuthenticationHome: '/',
        AuthenticationLogIn: 'log-in',
        RequestNetworkAccess: 'request-network-access',
        NetworkMembershipInvitationAccept: 'accept-invitation',
      },
    },
  },
};
