import { SafeAreaView, ScrollView, View, Text } from "react-native";
import ArticlesScreen from "@/components/ArticleScreen";
import { useUser } from "@clerk/clerk-expo";

export default function Home() {
	const { user } = useUser();

	return (
		<SafeAreaView>
			<View className='mt-5 mx-6'>
				<Text>welcome {user?.emailAddresses[0].emailAddress}</Text>
				<ArticlesScreen />
			</View>
		</SafeAreaView>
	);
}
