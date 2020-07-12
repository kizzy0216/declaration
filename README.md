# Declaration

## Setup

### Global prerequisites

```bash
npm install vercel --global
npm install hasura-cli --global
npm install expo-cli --global
```

Ensure you have iOS and Android simulators installed, or iOS and Android
devices on hand.

### Run Backend

```bash
cd backend
docker-compose up -d # start services
hasura console --admin-secret <HASURA_ADMIN_SECRET> # start hasura console
vercel dev # start REST API server

# additionally
hasura migrate apply --admin-secret <HASURA_ADMIN_SECRET>
hasura metadata apply --admin-secret <HASURA_ADMIN_SECRET>
```

Expected environment variables

```bash
HASURA_BASE_URL=
HASURA_ADMIN_SECRET_KEY=
JWT_SECRET_KEY=
NODE_ENV=
SENDGRID_API_KEY=
```

### Run Dashboard

```bash
cd dashboard
npm install
npm run dev
```

Expected environment variables

```bash
HASURA_BASE_URL=
REST_BASE_URL=
MARKETING_BASE_URL=
MOBILE_BASE_URL=
```

### Run Marketing

```bash
cd marketing
npm install
npm run dev
```

Expected environment variables

```bash
HASURA_BASE_URL=
REST_BASE_URL=
DASHBOARD_BASE_URL=
```

### Run Mobile

```bash
expo start
```

To run simulators:

```bash
open -a "Simulator" # for iOS

emulator @<NAME_OF_AVD> # for Android
```

Note: Ensure you have installed and configured iOS and Android
simulators/emulators correctly by following the guides on Expo.

To run [React Native Debugger](https://github.com/jhen0409/react-native-debugger):

```bash
open -g 'rndebugger://set-debugger-loc?port=19001'
```
