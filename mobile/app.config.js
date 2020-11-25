import path from 'path';
import dotenv from 'dotenv';

const BUILD_ENVIRONMENT_MODE = process.env.BUILD_ENVIRONMENT_MODE || 'development';

let dotenvPath = '.env';
if (BUILD_ENVIRONMENT_MODE === 'stage') {
  dotenvPath = '.stage.env';
} else if (BUILD_ENVIRONMENT_MODE === 'production') {
  dotenvPath = '.production.env';
}

dotenv.config({
  path: path.resolve(process.cwd(), dotenvPath),
});

export default {
  name: process.env.APPLICATION_NAME,
  slug: process.env.APPLICATION_SLUG,
  platforms: [
    'ios',
    'android',
  ],
  version: '1.3.1',
  orientation: 'portrait',
  owner: 'nickdandakis',
  icon: process.env.APPLICATION_ICON,
  scheme: process.env.APPLICATION_SCHEME,
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#222222'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  packagerOpts: {
    config: "metro.config.js",
    sourceExts: [
      "expo.ts",
      "expo.tsx",
      "expo.js",
      "expo.jsx",
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "wasm",
      "svg"
    ]
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: "declaration",
          project: process.env.APPLICATION_SLUG,
          authToken: "dc567a7733994c8bbe04c26ad60706c50fa8d4f885974d0881dcc84d72a52632"
        }
      }
    ]
  },
  extra: {
    HASURA_BASE_URL: process.env.HASURA_BASE_URL,
    REST_BASE_URL: process.env.REST_BASE_URL,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
  ios: {
    bundleIdentifier: process.env.APPLICATION_PACKAGE_ID,
    // irrelevant to version number, this is a build identifier
    // just increment per build of a version
    buildNumber: '1',
  },
  android: {
    package: process.env.APPLICATION_PACKAGE_ID,
    // irrelevant to version number, this is a build identifier
    // just increment per build of a version
    versionCode: 1,
  },
}
