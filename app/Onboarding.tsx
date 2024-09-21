import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function Index() {
	return (
		<SafeAreaView>
			<ScrollView>
				<View>
					<Image source={require("@/assets/images/hello.png")} />
					<View className=' bg-white rounded-[44px] items-center justify-center transform -translate-y-44 w-full p-4'>
						<View className='mx-5'>
							<Text className='font-semibold text-3xl text-center'>
								Get The Latest And Updates
							</Text>
							<Text className='mt-2 font-light text-xl'>
								From politics to entertainment, stay ahead with the latest news
								and trends, all in one place. Your go-to source for breaking
								updates and global developments—right at your fingertips!
							</Text>
							<TouchableOpacity
								onPress={() => router.push("/home")}
								className='mt-10 justify-center space-x-4 items-center w-44 bg-[#0B1A33] p-3 mx-auto rounded-full flex flex-row'>
								<Text className='font-semibold text-2xl text-white'>
									Explore
								</Text>
								<AntDesign name='arrowright' size={24} color='white' />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
