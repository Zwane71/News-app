import {
	View,
	Text,
	Button,
	TextInput,
	ActivityIndicator,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { ethers } from "ethers";

const Profile = () => {
	const { user } = useUser();
	const [firstName, setFirstName] = useState(user?.firstName || "");
	const [lastName, setLastName] = useState(user?.lastName || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onSaveUser = async () => {
		if (!user) return;

		if (!firstName || !lastName) {
			setError("First and last name cannot be empty.");
			return;
		}
		setError("");
		setLoading(true);

		try {
			await user.update({ firstName, lastName });
			console.log("User updated successfully.");
		} catch (e) {
			console.log("Error updating user:", e);
			setError("Failed to update user. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const connectWallet = async () => {
		if (!window.ethereum) {
			Alert.alert(
				"MetaMask not found",
				"Please install MetaMask to use this feature."
			);
			return;
		}

		setLoading(true);

		try {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const walletAddress = accounts[0];

			// Link the wallet address to Clerk user metadata
			await user?.updateMetadata({
				walletAddress: walletAddress,
			});

			Alert.alert(
				"Wallet Linked",
				`Successfully linked wallet: ${walletAddress}`
			);
		} catch (error) {
			console.error("Error connecting to MetaMask:", error);
			Alert.alert("Error", "Could not connect to MetaMask. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (!user) {
		return (
			<View className='flex-1 justify-center items-center bg-white'>
				<Text className='text-lg'>Loading user data...</Text>
			</View>
		);
	}

	return (
		<View className='flex-1 justify-center p-10 bg-white'>
			<Text className='text-center mb-4'>
				Good morning {user.firstName} {user.lastName}!
			</Text>

			<TextInput
				placeholder='First Name'
				value={firstName}
				onChangeText={setFirstName}
				className='mb-4 h-12 border border-x-blue-900 rounded-lg p-3 bg-white'
			/>
			<TextInput
				placeholder='Last Name'
				value={lastName}
				onChangeText={setLastName}
				className='mb-4 h-12 border border-x-blue-900 rounded-lg p-3 bg-white'
			/>

			{error ? <Text className='text-red-500 mb-4'>{error}</Text> : null}

			<Button
				onPress={onSaveUser}
				title='Update account'
				color='#0B1A33'
				disabled={loading}
			/>
			{loading && <ActivityIndicator size='small' color='#0B1A33' />}

			<Button
				title={loading ? "Linking Wallet..." : "Link MetaMask Wallet"}
				onPress={connectWallet}
				color='#0B1A33'
				disabled={loading}
			/>
		</View>
	);
};

export default Profile;
