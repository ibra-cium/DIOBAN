import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Learn() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-2xl font-nunito-bold text-gray-700">
          Learn Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}
