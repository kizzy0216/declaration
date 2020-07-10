import 'dotenv/config';

export default {
  name: 'Declaration',
  slug: 'declaration',
  platforms: [
    'ios',
    'android',
  ],
  version: '0.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  extra: {
    HASURA_BASE_URL: process.env.HASURA_BASE_URL,
    REST_BASE_URL: process.env.REST_BASE_URL,
  },
}
