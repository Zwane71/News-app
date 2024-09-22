import { Button, TextInput, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Stack } from "expo-router";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

const Register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<StyledView className='flex-1 justify-center p-5 bg-white'>
			<Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
			<Spinner visible={loading} />

			{!pendingVerification && (
				<>
					<StyledTextInput
						autoCapitalize='none'
						placeholder='makhohlisathemba@gmail.com'
						value={emailAddress}
						onChangeText={setEmailAddress}
						className='mb-4 h-12 border border-indigo-600 rounded-lg p-3 bg-white'
					/>
					<StyledTextInput
						placeholder='password'
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						className='mb-4 h-12 border border-indigo-600 rounded-lg p-3 bg-white'
					/>

					<Button onPress={onSignUpPress} title='Sign up' color='#6c47ff' />
				</>
			)}

			{pendingVerification && (
				<>
					<StyledTextInput
						value={code}
						placeholder='Code...'
						onChangeText={setCode}
						className='mb-4 h-12 border border-indigo-600 rounded-lg p-3 bg-white'
					/>
					<Button
						onPress={onPressVerify}
						title='Verify Email'
						color='#6c47ff'
					/>
				</>
			)}
		</StyledView>
	);
};

export default Register;
