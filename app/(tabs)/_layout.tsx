import TabBar from "@/components/TabBar";
import { Stack, Tabs } from "expo-router";
import { StatusBar } from "react-native";

export default function TabsLayout() {
	return (
		<Tabs tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name='home'
				options={{ headerShown: false, title: "Home" }}
			/>
			<Tabs.Screen
				name='explore'
				options={{ headerShown: false, title: "Explore" }}
			/>
			<Tabs.Screen
				name='bookmark'
				options={{ headerShown: false, title: "Bookmark" }}
			/>
			<Tabs.Screen
				name='profile'
				options={{ headerShown: false, title: "Profile" }}
			/>
			<StatusBar backgroundColor={"black"} />
		</Tabs>
	);
}
