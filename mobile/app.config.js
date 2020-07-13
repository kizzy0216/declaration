import 'dotenv/config';

export default {
  name: 'Declaration', // TODO switch between staging and production builds
  slug: 'declaration', // TODO switch between staging and production builds
  platforms: [
    'ios',
    'android',
  ],
  version: '0.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'declaration', // TODO switch between staging and production builds
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
  extra: {
    HASURA_BASE_URL: process.env.HASURA_BASE_URL,
    REST_BASE_URL: process.env.REST_BASE_URL,
  },
}
