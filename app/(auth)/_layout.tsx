import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

export const LogoutButton = () => {
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	return (
		<Pressable onPress={doLogout} style={{ marginRight: 10 }}>
			<Ionicons name='log-out-outline' size={24} color={"#fff"} />
		</Pressable>
	);
};

const TabsPage = () => {
	const { isSignedIn } = useAuth();

	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#6c47ff",
				},
				headerTintColor: "#fff",
			}}>
			<Stack.Screen
				name='Onboarding'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='(tabs)'
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default TabsPage;
