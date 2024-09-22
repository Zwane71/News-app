import NewsSources from "@/components/Article";
import Search from "@/components/Article";
import { SafeAreaView, ScrollView, View, Text } from "react-native";

export default function Explore() {
	return (
		<SafeAreaView>
			<View>
				<NewsSources />
			</View>
		</SafeAreaView>
	);
}
