# Declaration

## Architecture

This project is structured as a monorepo with five core properties:

- Backend
- Dashboard
- Shared (aka Interface)
- Marketing
- Mobile


### Backend architecture

The Backend is architected as two main components with the underlying data
layer being powered by a Postgres database. These are the Hasura/GraphQL
engine, and the Node.js REST API.

While everything *can* be fully built on Hasura, we have opted for the best
tool for the job and fallback to REST API endpoints for functionality that is
more well-suited for a REST implementation. A great example of that is
authentication, which is implemented with the `/api/authenticate.js`, and
`/api/log-out.js` endpoints.

Please fully read Hasura documentation to understand the architecture of the
primary API. We currently use Hasura's automatically-generated GraphQL API,
permissions, and events (webhooks). Hasura also manages data migrations and
other metadata (like relationships, permissions, event configuration).

### Dashboard architecture

The Dashboard is architected as an isomorphic web application powered by Next.js.

### Interface architecture

We utilize certain technologies across the entire platform (Javascript, React,
GraphQL), and have decided to maintain a directory of React components,
Javascript utility functions, and GraphQL queries/mutations that can be re-used
across all other properties.

Importing files from Interface into other properties is achieved with symlinks
and/or Babel aliases (in the case of the Mobile property). While the more
correct implementation would be an npm dependency with a version number, we
have decided to instead keep it simple and lean into the benefits of a monorepo.

### Marketing architecture

The Marketing site is architected as a statically generated web site powered by Next.js.

### Mobile architecture

The Mobile property is architected as a React Native application, fully Managed
by the Expo framework. We opt for React Hooks as much as possible, and use
Context for managing any kind of shared or global state. Data fetching is
implemented within the screen, and is only lifted up and into Context if
necessary. Screens are created and used liberally to separate concerns as high
up as possible.

### Authentication and authorization

Declaration is a private social network as-a-service platform. As such, please
keep in mind that almost all data is scoped to a Network. The main exception is
User, which can belong to multiple Networks.

Anyone can authenticate into Declaration, but will quickly reach a wall if
they're not a member of a Network or a Super Admin User. To be gain access to a
Network, we have three entry points:

- Become a Super Admin. This can only be accomplished by having admin access to
  the database, and after creating a User record. Insert a User UUID into the
`super_admin` table to gain Super Admin access.

- Get invited to a Network by a Network Admin or Super Admin. This is primarily
  achieved through the Dashboard, after navigating to the Network's Members
  page. A form exists on that page which inserts a row into the
  `network_membership_invitation` table, which fires a webhook to
  `/api/webhooks/network-membership-invitation`, which sends an email to the
  invited user. If the user accepts the invitation, a User record is created
  (if one didn't exist already), and are granted access to the Network via an
  entry in the `network_user` table.

- Request membership to a Network from a Network Admin or Super Admin. This is
  primarily achieved from the mobile applications, after registration. A screen
  exists that displays a list of Networks with forms to submit a Membership
  Request. Upon submission of the form, a row is created in the
  `network_membership_request` table, which fires a webhook to
  `/api/webhooks/network-membership-request`. A Network Admin or Super Admin
  can then accept the request on the Network's Members Dashboard page. After
  acceptance, the User can refresh the mobile application to gain access to the
  network.

Additionally, the `metal-future-printed-judge@example.com` email can be used to
bypass the entire authentication process. This was primarily created to allow
for a smoother Apple App Store review process.

### Content

Content is architected to have set of base fields, and then allow for a single
partial to extend Content to include functionality that differs significantly
from each other. On the frontend/design side we call these extensions
"Templates", on the backend side we call them "Partials" and are enabled via
the various `content_partial_*` tables.

As such, Content can have a heading, sub heading, body, media (via `media`
table), meta (via `content_meta` table), and a single `content_partial`
one-to-one relationship. Content Partial can then have a relationship to one of
several Content Partial sub-tables like `content_partial_poll`.

This structure allows us to define Content as our primitive, while still
allowing for Templates in an extensible manner. Maintaining Content as our
primitive is fundamental to Declaration's flexibility and value proposition.

## Setup

### Global prerequisites

```bash
npm install vercel --global
npm install hasura-cli --global
npm install expo-cli --global
```

Ensure you have iOS and Android simulators installed, or iOS and Android
devices on hand.

### Run Backend locally

```bash
cd backend
docker-compose up -d # start services
`npm run dev` or `hasura console --admin-secret <HASURA_ADMIN_SECRET>`  # start hasura console. https://hasura.io/docs/1.0/graphql/core/hasura-cli/hasura_console.html
vercel dev # start REST API server

# additionally, to initialize your local database, run the following only once:
hasura migrate apply --admin-secret <HASURA_ADMIN_SECRET>
hasura metadata apply --admin-secret <HASURA_ADMIN_SECRET>
```

Create a .env file with expected environment variables:

```bash
HASURA_BASE_URL="http://localhost:8080/v1/graphql"
HASURA_ADMIN_SECRET_KEY=
JWT_SECRET_KEY=
NODE_ENV='development'
SENDGRID_API_KEY=
DECLARATION_AWS_ACCESS_KEY=
DECLARATION_AWS_SECRET_KEY=
DECLARATION_AWS_BUCKET_NAME=
```

Note: Some environment variables are prefixed with `DECLARATION_` due to
[Vercel Platform Limitations](https://vercel.com/docs/v2/platform/limits).

### Run Dashboard locally

```bash
cd dashboard
npm install
npm run dev
```

### Run Marketing locally

```bash
cd marketing
npm install
npm run dev
```

### Run Mobile locally

```bash
expo start
```

To run URQL tools for monitoring database queries:

`npx urql-devtools`

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

## Deployment

### Deploy backend

The backend consists of three technologies:

1. Postgres database
2. Hasura GraphQL server
3. REST API functions

#### Deploying Postgres database

We deploy and manage the Postgres database with [AWS RDS](https://aws.amazon.com/rds/).

After spinning up the LTS version of Postgres, follow the
[Hasura guide for Postgres
requirements](https://hasura.io/docs/1.0/graphql/manual/deployment/postgres-requirements.html).
It essentially entails configuring a database user for Hasura to use, with the
required permissions, and ensuring the appropriate Postgres extensions are
installed.

Once the Postgres database is deployed and ready for Hasura consumption, deploy
the Hasura GraphQL server.

#### Deploying Hasura

We deploy Hasura as a [Docker](https://www.docker.com/) image to [AWS Elastic
Beanstalk](https://aws.amazon.com/elasticbeanstalk/).

Spin up an Elastic Beanstalk Docker application (Single Container), create an
environment, configure the environment's capacity to be Load balanced with
minimum and maxmimum instance counts. This ensures that a load balancer is
provisioned for the environment, which is necessary for HTTPS.

Ensure the expected environment variables are set:

```bash
HASURA_GRAPHQL_DATABASE_URL=
HASURA_GRAPHQL_ENABLE_CONSOLE=
HASURA_GRAPHQL_ADMIN_SECRET=
HASURA_GRAPHQL_JWT_SECRET=
HASURA_GRAPHQL_UNAUTHORIZED_ROLE=
NETWORK_MEMBERSHIP_INVITATION_WEBHOOK_URL=
VERIFICATION_CODE_WEBHOOK_URL=
USER_WEBHOOK_URL=
NETWORK_USER_WEBHOOK_URL=
NETWORK_USER_RELATIONSHIP_WEBHOOK_URL=
COMMENT_WEBHOOK_URL=
CONTENT_STAR_WEBHOOK_URL=
CONTENT_WEBHOOK_URL=
CONTENT_META_WEBHOOK_URL=
MEDIA_WEBHOOK_URL=
```

See `./backend/docker-compose.yml` for examples of the above environment
variables. Updating environment variables might require a redeployment to take
effect.

Upload `dockerrun.aws.json` as the application artifact to the environment. The
artifact essentially tells Elastic Beanstalk to fetch the public Hasura docker
image and run it with port 8080 exposed. We shouldn't need to change and
redeploy this often.

At this point, the Elastic Beanstalk environment should be working as expected
on the Elastic Beanstalk provisioned URL. To configure a declaration.net
specific subdomain, do the following.

Create a CNAME record that maps the declaration.net subdomain to the Elastic
Beanstalk provisioned URL.

Create an SSL certificate for the subdomain you intend to use with [AWS
Certificate Manager](https://aws.amazon.com/certificate-manager/). Once the
certificate is verified and provisioned, go back to the Elastic Beanstalk
environment, configure the load balancer, and add a new listener for HTTPS. The
configuration should be listener port 443, listener protocol HTTPS, instance
port 80, instance protocol HTTP, SSL certificate should be the certificate that
was just provisioned.

The Hasura server should now be working on HTTP and HTTPS, both on the Elastic
Beanstalk provisioned URL, as well as the declaration.net subdomain.

For incremental deployments:

`hasura migrate apply`
`hasura metadata apply`

### Deploying REST API functions

The REST API is coded as serverless functions that are intended to run on the
[Vercel platform](https://vercel.com).

Ensure your Vercel account has a seat on the Declaration Vercel team.

Ensure the expected environment variables are set:

```bash
HASURA_BASE_URL=
HASURA_ADMIN_SECRET_KEY=
JWT_SECRET_KEY=
NODE_ENV="production"
SENDGRID_API_KEY=
DECLARATION_AWS_ACCESS_KEY=
DECLARATION_AWS_SECRET_KEY=
DECLARATION_AWS_BUCKET_NAME=
```

See `./backend/.env` for examples of the above environment variables. Updating
environment variables requires a redeployment to take effect. To set
environment variables, either use the `vercel env` command or navigate to the
Vercel settings page for the declaration-backend project.

To deploy, simply run `vercel` in the `./backend/` directory. An immutable
deployment will be created. The immutable deployment can then be aliased to the
intended URL. The immutable deployment can then be aliased to the intended URL
(e.g. `vercel alias
https://declaration-backend-nickdandakis.declaration.vercel.app
https://stage.api.declaration.net`).

To deploy to production, simply run `vercel --prod`.

### Deploying Dashboard

The Dashboard is coded as an isomorphic Nextjs application that is intended to
be run on the  [Vercel platform](https://vercel.com).

Ensure your Vercel account has a seat on the Declaration Vercel team.

Ensure the expected environment variables are set:

```bash
HASURA_BASE_URL=
REST_BASE_URL=
MARKET_BASE_URL=
MOBILE_BASE_URL=
BASE_URL=
```

See `./dashboard/next.config.js` for examples of the above environment variables. Updating
environment variables requires a redeployment to take effect. To set
environment variables, either use the `vercel env` command or navigate to the
Vercel settings page for the declaration-dashboard project.

To deploy, simply run `vercel` in the `./dashboard/` directory. An immutable
deployment will be created. The immutable deployment can then be aliased to the
intended URL (e.g. `vercel alias
https://declaration-dashboard-nickdandakis.declaration.vercel.app
https://stage.dashboard.declaration.net`).

To deploy to production, simply run `vercel --prod`.

### Deploying Marketing

The Dashboard is coded as a statically generated Nextjs application that is intended to
be run on the  [Vercel platform](https://vercel.com).

Ensure your Vercel account has a seat on the Declaration Vercel team.

Ensure the expected environment variables are set:

```bash
HASURA_BASE_URL=
REST_BASE_URL=
DASHBOARD_BASE_URL=
BASE_URL=
```

See `./marketing/next.config.js` for examples of the above environment variables. Updating
environment variables requires a redeployment to take effect. To set
environment variables, either use the `vercel env` command or navigate to the
Vercel settings page for the declaration-dashboard project.

To deploy, simply run `vercel` in the `./marketing/` directory. An immutable
deployment will be created. The immutable deployment can then be aliased to the
intended URL. The immutable deployment can then be aliased to the intended URL
(e.g. `vercel alias
https://declaration-marketing-nickdandakis.declaration.vercel.app
https://stage.declaration.net`).

To deploy to production, simply run `vercel --prod`.

### Vercel deployments and environment variables

Vercel deployments are split into three environments. Production, Preview, and Development.

The Development environment is what's loaded when you use `vercel dev`.

The Preview environment is what's loaded when you deploy with `vercel`.

The Production environment is what's loaded when you deploy with `vercel --prod`.

Take care in setting the appropriate environment variables for each project,
and each environment.  We largely ignore the Development environment, as we use
local `process.env` overload files during development. But, ensure Preview and
Production environment variables are set correctly.

### Deploying Mobile

The Mobile application is coded as a React Native application, built with the
[Expo](https://expo.io) managed workflow.

We maintain two mobile applications, one for production named 'Declaration',
and one for stage named 'Declaration (Stage)'. Each application has separate
environment variables, `./mobile/.production.env` and `./mobile/.stage.env`
respectively.

Ensure you are a part of the Declaration Apple team, and Declaration Google
Play team.

Update the `package.json` version.  The version number can then be found at the bottom of the Settings screen in the app
Update the `app.config.js` version, buildNumber, and versionCode for the Apple/Google deployment.
```bash
# to publish production iOS
BUILD_ENVIRONMENT_MODE="production" expo publish:ios
# to build production iOS
BUILD_ENVIRONMENT_MODE="production" expo build:ios -t archive
# to upload production iOS
BUILD_ENVIRONMENT_MODE="production" expo upload:ios

# to publish production Android
BUILD_ENVIRONMENT_MODE="production" expo publish:android
# to build production Android
BUILD_ENVIRONMENT_MODE="production" expo build:android -t app-bundle
# to upload production Android
BUILD_ENVIRONMENT_MODE="production" expo upload:android

# to publish stage iOS
BUILD_ENVIRONMENT_MODE="stage" expo publish:ios
# to build stage iOS
BUILD_ENVIRONMENT_MODE="stage" expo build:ios -t archive
# to upload stage iOS
BUILD_ENVIRONMENT_MODE="stage" expo upload:ios

# to publish stage Android
BUILD_ENVIRONMENT_MODE="stage" expo publish:android
# to build stage Android
BUILD_ENVIRONMENT_MODE="stage" expo build:android -t app-bundle
# to upload stage Android
BUILD_ENVIRONMENT_MODE="stage" expo upload:android
```

Building means creating the mobile platform's equivalent standalone artifact
(Archive for iOS, App Bundle for Android).

Publishing means deploying the updated React Native bundle to Expo's servers.

Uploading means submitting the previously built standalone application to
Apple/Google servers.

#### Over-the-air updates, publishing vs uploading

Expo manages over-the-air updates of our application. The standard procedure is
to _always publish new builds_, but _sometimes upload new builds_ if native changes have
occurred. Check the Expo documentation for [more
information](https://docs.expo.io/workflow/publishing/#some-native-configuration-cant-be-updated-by).

