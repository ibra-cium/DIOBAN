import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-4xl font-nunito-extrabold text-primary mb-4">
        Dioban
      </Text>
      <Text className="text-lg font-nunito text-gray-500">
        Design System Test
      </Text>
      <Link href="/onboarding" asChild>
        <TouchableOpacity className="mt-8 px-6 py-4 bg-primary rounded-xl border-b-4 border-primary-shadow">
          <Text className="text-white font-nunito-bold text-lg uppercase">
            Go to Onboarding
          </Text>
        </TouchableOpacity>
      </Link>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}
