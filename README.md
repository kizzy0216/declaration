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

### Run backend

```bash
cd backend
docker-compose up -d # start services
hasura console --admin-secret <HASURA_ADMIN_SECRET> # start hasura console

# optionally
hasura migrate apply --admin-secret <HASURA_ADMIN_SECRET>
hasura metadata apply --admin-secret <HASURA_ADMIN_SECRET>
```

### Run mobile

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
