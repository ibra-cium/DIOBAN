import { images } from "@/constants/images";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 px-6 pt-4 pb-8 justify-between">
        {/* Header / Logo */}
        <View className="flex-row items-center justify-center mt-2">
          <Image
            source={images.mascotLogo}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <Text className="text-2xl font-nunito-extrabold text-[#1F2937] ml-2">
            DIOBAN
          </Text>
        </View>

        {/* Text Content */}
        <View className="mt-8">
          <Text className="text-4xl font-nunito-extrabold text-[#0D152D] leading-[48px]">
            Your AI language
          </Text>
          <Text className="text-4xl font-nunito-extrabold text-[#5B42FF] leading-[48px]">
            teacher.
          </Text>
          <Text className="text-base font-nunito text-gray-500 mt-4 leading-6">
            Real conversations, personalized{"\n"}lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot Image */}
        <View className="flex-1 justify-center items-center my-4 relative">
          {/* Bubble 1: Hello! */}
          <View className="absolute top-4 left-2 bg-[#F0F7FF] px-4 py-2 rounded-2xl rounded-bl-sm z-10 shadow-sm border border-[#E0F2FE]">
            <Text className="text-[#0D152D] font-nunito-bold text-lg">Hello!</Text>
          </View>

          {/* Bubble 2: ¡Hola! */}
          <View className="absolute top-0 right-6 bg-[#F3E8FF] px-4 py-2 rounded-2xl rounded-br-sm z-10 shadow-sm border border-[#E9D5FF]">
            <Text className="text-[#5B42FF] font-nunito-bold text-lg">¡Hola!</Text>
          </View>

          {/* Bubble 3: 你好! */}
          <View className="absolute top-[25%] right-0 bg-[#FFF1F2] px-4 py-2 rounded-2xl rounded-br-sm z-10 shadow-sm border border-[#FFE4E6]">
            <Text className="text-[#E11D48] font-nunito-bold text-lg">你好!</Text>
          </View>

          <Image
            source={images.mascotWelcome}
            style={{ width: width * 0.8, height: width * 0.8 }}
            resizeMode="contain"
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          className="bg-[#5B42FF] w-full py-4 rounded-2xl flex-row items-center justify-center mt-auto"
          activeOpacity={0.8}
          onPress={() => router.push("/sign-up")}
        >
          <Text className="text-white text-lg font-nunito-bold text-center flex-1 ml-6">
            Get Started
          </Text>
          <Feather name="chevron-right" size={24} color="white" className="mr-4" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
