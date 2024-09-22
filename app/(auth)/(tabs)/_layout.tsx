import TabBar from "@/components/TabBar";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { Pressable, StatusBar } from "react-native";
import { LogoutButton } from "../_layout";
import { useAuth } from "@clerk/clerk-expo";

export const Logoutbutton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons name='log-out-outline' size={24} color={"black"} />
		</Pressable>
	);
};

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
				options={{
					headerTitle: "My Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person-outline' size={size} color={color} />
					),
					tabBarLabel: "My Profile",
					headerRight: () => <Logoutbutton />,
				}}
			/>
			{/* <StatusBar backgroundColor={"black"} /> */}
		</Tabs>
	);
}
