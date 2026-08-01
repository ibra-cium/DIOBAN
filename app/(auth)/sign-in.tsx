import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
            Welcome back
          </Text>
          <Text className="text-base font-nunito text-gray-500 mt-2">
            Log in to continue your journey
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
            />
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-[#5B42FF] w-full py-4 rounded-2xl items-center justify-center mt-6"
          activeOpacity={0.8}
          onPress={() => setShowModal(true)}
        >
          <Text className="text-white text-lg font-nunito-bold">Log in</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-gray-100" />
          <Text className="mx-4 text-gray-400 font-nunito text-sm">or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-100" />
        </View>

        {/* Social Auth Buttons */}
        <View className="space-y-4">
          <TouchableOpacity className="border border-gray-100 rounded-2xl py-3 flex-row items-center justify-center">
            <View className="absolute left-6">
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={{ width: 24, height: 24 }} resizeMode="contain" />
            </View>
            <Text className="font-nunito-bold text-[#0D152D] text-base">Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-gray-100 rounded-2xl py-3 flex-row items-center justify-center mt-4">
            <View className="absolute left-6">
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' }} style={{ width: 24, height: 24 }} resizeMode="contain" />
            </View>
            <Text className="font-nunito-bold text-[#0D152D] text-base">Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-gray-100 rounded-2xl py-3 flex-row items-center justify-center mt-4">
            <View className="absolute left-6">
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/154/154870.png' }} style={{ width: 24, height: 24 }} resizeMode="contain" />
            </View>
            <Text className="font-nunito-bold text-[#0D152D] text-base">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500 font-nunito text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="text-[#5B42FF] font-nunito-bold text-base">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <VerificationModal visible={showModal} onClose={() => setShowModal(false)} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
