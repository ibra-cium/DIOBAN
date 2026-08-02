import { useUser } from "@clerk/expo";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import { LESSONS } from "../../data/lessons";
import { UNITS } from "../../data/units";
import { useLanguageStore } from "../../store/useLanguageStore";

export default function Index() {
  const { user } = useUser();
  const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

  // Find current unit and lesson (mock logic for now, taking first ones of the language)
  const currentUnit = UNITS.find(u => u.languageId === selectedLanguage?.id);
  const currentLesson = LESSONS.find(l => l.unitId === currentUnit?.id);
  const activities = currentLesson?.activities || [];

  const getGreeting = (langId?: string) => {
    switch (langId) {
      case 'es': return 'Hola';
      case 'fr': return 'Bonjour';
      case 'de': return 'Hallo';
      case 'bn': return 'Salam';
      default: return 'Hello';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 20 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <View className="flex-row items-center">
            {selectedLanguage?.flagIcon ? (
              <Image source={{ uri: selectedLanguage.flagIcon }} style={{ width: 32, height: 32, borderRadius: 16 }} />
            ) : (
              <View className="w-8 h-8 rounded-full bg-gray-200" />
            )}
            <Text className="text-xl font-nunito-bold text-gray-800 ml-3">
              {getGreeting(selectedLanguage?.id)}, {user?.firstName || "Alex"}!
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <Image source={images.streakFire} style={{ width: 24, height: 24 }} />
              <Text className="text-lg font-nunito-bold text-gray-800 ml-1">12</Text>
            </View>
            <TouchableOpacity>
              <Feather name="bell" size={24} color="#4B4B4B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Goal Card */}
        <View className="bg-orange-50 rounded-2xl p-5 mb-6 flex-row justify-between items-center border border-orange-100">
          <View className="flex-1">
            <Text className="text-gray-600 font-nunito-bold mb-2">Daily goal</Text>
            <View className="flex-row items-baseline mb-3">
              <Text className="text-3xl font-nunito-extrabold text-gray-800">15</Text>
              <Text className="text-base font-nunito-bold text-gray-400 ml-1">/ 20 XP</Text>
            </View>
            <View className="h-2.5 bg-orange-200 rounded-full w-full max-w-[150px]">
              <View className="h-2.5 bg-orange-500 rounded-full" style={{ width: "75%" }} />
            </View>
          </View>
          <Image source={images.treasure} style={{ width: 70, height: 70 }} contentFit="contain" />
        </View>

        {/* Continue Learning Card */}
        <TouchableOpacity className="bg-indigo-500 rounded-2xl p-5 mb-8 overflow-hidden relative">
          <View className="z-10 w-2/3">
            <Text className="text-indigo-100 font-nunito mb-1">Continue learning</Text>
            <Text className="text-white text-3xl font-nunito-extrabold mb-1">{selectedLanguage?.name || "Spanish"}</Text>
            <Text className="text-indigo-100 font-nunito mb-4">A1 • Unit {currentUnit?.order || 3}</Text>
            <TouchableOpacity className="bg-white rounded-xl py-3 px-6 self-start">
              <Text className="text-indigo-600 font-nunito-bold text-base">Continue</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={images.palace}
            style={{ width: 140, height: 140, position: 'absolute', right: -10, bottom: -10 }}
            contentFit="contain"
          />
        </TouchableOpacity>

        {/* Today's Plan */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-nunito-extrabold text-gray-800">Today's plan</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-nunito-bold">View all</Text>
            </TouchableOpacity>
          </View>

          {/* Lesson */}
          <View className="flex-row items-center mb-5">
            <View className="w-14 h-14 bg-indigo-500 rounded-2xl items-center justify-center mr-4">
              <Feather name="book-open" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-nunito-bold text-gray-800">Lesson</Text>
              <Text className="text-gray-500 font-nunito">{currentLesson?.title || "At the café"}</Text>
            </View>
            <View className="w-8 h-8 rounded-full bg-indigo-500 items-center justify-center">
              <Feather name="check" size={16} color="white" />
            </View>
          </View>

          {/* AI Conversation */}
          <View className="flex-row items-center mb-5">
            <View className="w-14 h-14 bg-purple-500 rounded-2xl items-center justify-center mr-4">
              <Feather name="headphones" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-nunito-bold text-gray-800">AI Conversation</Text>
              <Text className="text-gray-500 font-nunito">Talk about your day</Text>
            </View>
            <View className="w-8 h-8 rounded-full border-2 border-gray-300" />
          </View>

          {/* New words */}
          <View className="flex-row items-center mb-5">
            <View className="w-14 h-14 bg-red-400 rounded-2xl items-center justify-center mr-4">
              <Feather name="message-square" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-nunito-bold text-gray-800">New words</Text>
              <Text className="text-gray-500 font-nunito">10 words</Text>
            </View>
            <View className="w-8 h-8 rounded-full border-2 border-gray-300" />
          </View>
        </View>

      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
