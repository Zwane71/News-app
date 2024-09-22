import { View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const PwReset = () => {
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const { signIn, setActive } = useSignIn();

	const onRequestReset = async () => {
		try {
			await signIn!.create({
				strategy: "reset_password_email_code",
				identifier: emailAddress,
			});
			setSuccessfulCreation(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	const onReset = async () => {
		try {
			const result = await signIn!.attemptFirstFactor({
				strategy: "reset_password_email_code",
				code,
				password,
			});
			console.log(result);
			alert("Password reset successfully");

			await setActive!({ session: result.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	return (
		<View className='flex-1 justify-center p-5'>
			<Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

			{!successfulCreation ? (
				<>
					<TextInput
						autoCapitalize='none'
						placeholder='simon@galaxies.dev'
						value={emailAddress}
						onChangeText={setEmailAddress}
						className='h-12 border border-[#6c47ff] rounded-md p-2 bg-white'
					/>

					<Button
						onPress={onRequestReset}
						title='Send Reset Email'
						color={"#6c47ff"}
					/>
				</>
			) : (
				<>
					<View>
						<TextInput
							value={code}
							placeholder='Code...'
							className='h-12 border border-[#6c47ff] rounded-md p-2 bg-white'
							onChangeText={setCode}
						/>
						<TextInput
							placeholder='New password'
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							className='h-12 border border-[#6c47ff] rounded-md p-2 bg-white'
						/>
					</View>
					<Button
						onPress={onReset}
						title='Set new Password'
						color={"#6c47ff"}
					/>
				</>
			)}
		</View>
	);
};

export default PwReset;
