import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-2xl font-nunito-bold text-gray-700">
          Profile Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}
