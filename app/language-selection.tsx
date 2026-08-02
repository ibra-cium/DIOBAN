import { images } from "@/constants/images";
import { Language, SUPPORTED_LANGUAGES } from "@/data/languages";
import { useLanguageStore } from "@/store/useLanguageStore";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelection() {
  const { selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const [activeLanguage, setActiveLanguage] = useState<Language | null>(selectedLanguage);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="px-6 pt-4 pb-2">
        {/* We can add a back button here if needed */}
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }} bounces={true}>

        <Text className="text-2xl font-nunito-extrabold text-gray-800 mb-8 text-center mt-4">
          What would you like to learn?
        </Text>

        <View className="w-full flex-col gap-y-4">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = activeLanguage?.id === lang.id;

            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setActiveLanguage(lang)}
                activeOpacity={0.7}
                className={`w-full bg-white rounded-2xl p-4 border-2 flex-row items-center ${isSelected
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
                  }`}
                style={isSelected ? { borderBottomWidth: 4, borderBottomColor: "#42B029" } : { borderBottomWidth: 4, borderBottomColor: "#E5E7EB" }}
              >
                <Image
                  source={{ uri: lang.flagIcon }}
                  style={{ width: 48, height: 36, borderRadius: 6, marginRight: 16 }}
                />
                <Text className={`font-nunito-bold text-lg ${isSelected ? "text-primary" : "text-gray-700"}`}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="flex-1 justify-end items-center w-full mt-12">
          <Image
            source={images.earth}
            className="w-full"
            style={{ height: 200, marginBottom: 32 }}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => {
              if (activeLanguage) {
                setSelectedLanguage(activeLanguage);
                router.push("/" as any);
              }
            }}
            disabled={!activeLanguage}
            activeOpacity={0.7}
            className={`w-full py-4 rounded-xl items-center ${activeLanguage
              ? "bg-primary"
              : "bg-gray-200"
              }`}
            style={activeLanguage ? { borderBottomWidth: 4, borderBottomColor: "#42B029" } : {}}
          >
            <Text className={`font-nunito-extrabold text-lg uppercase ${activeLanguage ? "text-white" : "text-gray-400"
              }`}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
