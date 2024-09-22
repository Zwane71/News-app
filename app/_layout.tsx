import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
	throw new Error(
		"Clerk publishable key is missing. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables."
	);
}

const tokenCache = {
	async getToken(key: string) {
		try {
			return await SecureStore.getItemAsync(key);
		} catch (err) {
			console.error("Error getting token:", err);
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return await SecureStore.setItemAsync(key, value);
		} catch (err) {
			console.error("Error saving token:", err);
		}
	},
};

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return; // Wait until authentication is loaded

		const inTabsGroup = segments[0] === "(tabs)";
		console.log("Auth loaded");
		console.log("User signed in:", isSignedIn);

		if (isSignedIn && !inTabsGroup) {
			router.replace("/home");
		} else if (!isSignedIn) {
			router.replace("/");
		}
	}, [isSignedIn]);

	return <Slot />;
};

export default function RootLayout() {
	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY}
			tokenCache={tokenCache}>
			<InitialLayout />
		</ClerkProvider>
	);
}
