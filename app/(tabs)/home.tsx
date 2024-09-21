import { SafeAreaView, ScrollView, View, Text } from "react-native";
import ArticlesScreen from "@/components/ArticleScreen";

export default function Home() {
	return (
		<SafeAreaView>
			<ScrollView>
				<View className='mt-5 mx-6'>
					<Text>Home</Text>
					<ArticlesScreen />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
