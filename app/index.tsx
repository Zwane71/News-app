import { Redirect, router } from "expo-router";

import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	return (
		<SafeAreaView className=' justify-center items-center bg-[#0B1A33] h-full'>
			<TouchableOpacity onPressIn={() => router.push("./Onboarding")}>
				<Image source={require("@/assets/images/Group-13.png")} />
			</TouchableOpacity>
			<StatusBar backgroundColor='dark' />
		</SafeAreaView>
	);
}
