import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, Pressable, Text, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const Login = () => {
	const { signIn, setActive, isLoaded } = useSignIn();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);
		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password,
			});

			// This indicates the user is signed in
			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			Alert.alert("Error", err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<StyledView className='flex-1 justify-center p-5 bg-white'>
			<Spinner visible={loading} />

			<StyledTextInput
				autoCapitalize='none'
				placeholder='makhohlisathemba@gmail.com'
				value={emailAddress}
				onChangeText={setEmailAddress}
				className='mb-4 h-12 border border-x-blue-900 rounded-lg p-3 bg-white'
			/>
			<StyledTextInput
				placeholder='password'
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				className='mb-4 h-12 border border-x-blue-900 rounded-lg p-3 bg-white'
			/>

			<Button onPress={onSignInPress} title='Login' color='#6c47ff' />

			<Link href='/reset' asChild>
				<StyledPressable className='mt-4 items-center'>
					<StyledText className='text-indigo-600'>Forgot password?</StyledText>
				</StyledPressable>
			</Link>
			<Link href='/register' asChild>
				<StyledPressable className='mt-4 items-center'>
					<StyledText className='text-indigo-600'>Create Account</StyledText>
				</StyledPressable>
			</Link>
		</StyledView>
	);
};

export default Login;
