# Full stack AI video application using Appwrite and Expo 👋

This is an Full Stack AI Video application project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and using [`Appwrite`](https://appwrite.io) as the main back-end.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create `.env` file and add the following configurations
   ```zsh title=".env"
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PLATFORM="Your Appwrite Platform"
   EXPO_PUBLIC_APPWRITE_PROJECTID="Your Appwrite Project ID"
   EXPO_PUBLIC_APPWRITE_DATABASEID="Your Appwrite Database ID"
   EXPO_PUBLIC_APPWRITE_USERCOLLECTIONID="Your Appwrite User Collection ID"
   EXPO_PUBLIC_APPWRITE_VIDEOCOLLECTIONID="Your Appwrite Video Collection ID"
   EXPO_PUBLIC_APPWRITE_STORAGEBUCKETID="Your Appwrite Storage Bucket ID"
   ```
3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
