import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins:{
      FirebaseAuthentication: {
        skipNativeAuth: false,
        providers: ["google.com", "twitter.com"]
      },
      PushNotifications: {
        presentationOptions: ["badge", "sound", "alert"],
      },
  }
};

export default config;
