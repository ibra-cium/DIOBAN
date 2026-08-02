import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black, useFonts } from "@expo-google-fonts/nunito";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from "react";
import "../global.css";

WebBrowser.maybeCompleteAuthSession();

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

import { useLanguageStore } from "@/store/useLanguageStore";

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboarding = segments[0] === 'onboarding';
    const inLanguageSelection = segments[0] === 'language-selection';

    if (isSignedIn) {
      if (!selectedLanguage && !inLanguageSelection) {
        router.replace('/language-selection' as any);
      } else if (selectedLanguage && (inAuthGroup || inOnboarding || inLanguageSelection)) {
        router.replace('/' as any);
      }
    } else if (!isSignedIn && !inAuthGroup && !inOnboarding) {
      router.replace('/onboarding');
    }
  }, [isSignedIn, isLoaded, segments, selectedLanguage]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
