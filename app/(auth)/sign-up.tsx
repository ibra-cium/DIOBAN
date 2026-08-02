import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUp, useAuth, useSSO, isClerkAPIResponseError } from "@clerk/expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

export default function SignUpScreen() {
  useWarmUpBrowser();
  const router = useRouter();
  const { signUp } = useSignUp();
  const { isLoaded } = useAuth();
  const { startSSOFlow } = useSSO();
  
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [oauthStrategy, setOauthStrategy] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter an email and password.");
      return;
    }
    if (!isValidEmail(emailAddress)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }
    
    setIsSigningUp(true);
    try {
      const { error } = await signUp.password({ emailAddress, password });
      if (error) {
        const err = error as any;
        Alert.alert("Error", err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || "Failed to sign up");
        setIsSigningUp(false);
        return;
      }
      
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        const sErr = sendError as any;
        Alert.alert("Error", sErr.errors?.[0]?.longMessage || sErr.errors?.[0]?.message || sErr.message || "Failed to send code");
        setIsSigningUp(false);
        return;
      }
      
      setIsSigningUp(false);
      setShowModal(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0]?.longMessage || err.errors[0]?.message || "Failed to sign up");
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
      setIsSigningUp(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded) return;
    setIsVerifying(true);
    
    try {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      if (error) {
        const err = error as any;
        Alert.alert("Error", err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || "Invalid code");
        setIsVerifying(false);
        return;
      }
      
      const { error: finalizeError } = await signUp.finalize({
        navigate: () => router.replace('/')
      });
      
      if (finalizeError) {
        const fErr = finalizeError as any;
        Alert.alert("Error", fErr.errors?.[0]?.longMessage || fErr.errors?.[0]?.message || fErr.message || "Failed to complete sign up");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0]?.longMessage || err.errors[0]?.message || "Invalid code");
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOAuth = async (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    setOauthStrategy(strategy);
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/');
      } else if (signUp?.status === 'missing_requirements') {
        Alert.alert("Error", "Additional information is required.");
      }
    } catch (err: any) {
      if (err?.code === 'SIGN_IN_CANCELLED' || err?.code === '-5' || err?.code === 'session_canceled') return;
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0]?.longMessage || err.errors[0]?.message || "Failed to sign in");
      } else {
        Alert.alert("Error", err.message || "An unexpected error occurred");
        console.error(err);
      }
    } finally {
      setOauthStrategy(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}>
        {/* Header Back Button */}
        <TouchableOpacity
          className="mt-2 w-10 h-10 items-center justify-center -ml-2"
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={28} color="#0D152D" />
        </TouchableOpacity>

        {/* Title & Subtitle */}
        <View className="mt-4">
          <Text className="text-[32px] font-nunito-extrabold text-[#0D152D] leading-[40px]">
            Create your account
          </Text>
          <Text className="text-base font-nunito text-gray-500 mt-2">
            Start your language journey today
          </Text>
        </View>

        {/* Mascot */}
        <View className="items-center justify-center my-6">
          <Image
            source={images.mascotAuth}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Inputs */}
        <View className="space-y-4">
          <View className="border border-gray-200 rounded-2xl p-4 bg-white">
            <Text className="text-xs font-nunito text-gray-400 mb-1">Email</Text>
            <TextInput
              placeholder="alex@gmail.com"
              placeholderTextColor="#9CA3AF"
              className="font-nunito-bold text-base text-[#0D152D] p-0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
          </View>

          <View className="border border-gray-200 rounded-2xl p-4 bg-white flex-row items-center justify-between mt-4">
            <View className="flex-1">
              <Text className="text-xs font-nunito text-gray-400 mb-1">Password</Text>
              <TextInput
                placeholder="•••••••••"
                placeholderTextColor="#9CA3AF"
                className="font-nunito-bold text-base text-[#0D152D] p-0"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2 -mr-2">
              <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`bg-[#5B42FF] w-full py-4 rounded-2xl items-center justify-center mt-6 ${isSigningUp ? 'opacity-70' : ''}`}
          activeOpacity={0.8}
          onPress={handleSignUp}
          disabled={isSigningUp || !isLoaded}
        >
          {isSigningUp ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-nunito-bold">Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-gray-100" />
          <Text className="mx-4 text-gray-400 font-nunito text-sm">or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-100" />
        </View>

        {/* Social Auth Buttons */}
        <View className="space-y-4">
          <TouchableOpacity 
            onPress={() => handleOAuth('oauth_google')}
            disabled={oauthStrategy !== null}
            className={`border border-gray-100 rounded-2xl py-3 flex-row items-center justify-center ${oauthStrategy === 'oauth_google' ? 'opacity-70' : ''}`}
          >
            <View className="absolute left-6">
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={{ width: 24, height: 24 }} resizeMode="contain" />
            </View>
            {oauthStrategy === 'oauth_google' ? (
              <ActivityIndicator color="#0D152D" />
            ) : (
              <Text className="font-nunito-bold text-[#0D152D] text-base">Continue with Google</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleOAuth('oauth_facebook')}
            disabled={oauthStrategy !== null}
            className={`border border-gray-100 rounded-2xl py-3 flex-row items-center justify-center mt-4 ${oauthStrategy === 'oauth_facebook' ? 'opacity-70' : ''}`}
          >
            <View className="absolute left-6">
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' }} style={{ width: 24, height: 24 }} resizeMode="contain" />
            </View>
            {oauthStrategy === 'oauth_facebook' ? (
              <ActivityIndicator color="#0D152D" />
            ) : (
              <Text className="font-nunito-bold text-[#0D152D] text-base">Continue with Facebook</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => handleOAuth('oauth_apple')}
            disabled={oauthStrategy !== null}
            className={`border border-gray-100 rounded-2xl py-3 flex-row items-center justify-center mt-4 ${oauthStrategy === 'oauth_apple' ? 'opacity-70' : ''}`}
          >
            <View className="absolute left-6">
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/154/154870.png' }} style={{ width: 24, height: 24 }} resizeMode="contain" />
            </View>
            {oauthStrategy === 'oauth_apple' ? (
              <ActivityIndicator color="#0D152D" />
            ) : (
              <Text className="font-nunito-bold text-[#0D152D] text-base">Continue with Apple</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500 font-nunito text-base">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text className="text-[#5B42FF] font-nunito-bold text-base">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>

      {/* Clerk Captcha Mount Point */}
      <View nativeID="clerk-captcha" />

      <VerificationModal 
        visible={showModal} 
        onClose={() => setShowModal(false)} 
        onVerify={handleVerify}
      />
      
      {/* Verification Overlay */}
      {isVerifying && (
        <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#5B42FF" />
        </View>
      )}
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
