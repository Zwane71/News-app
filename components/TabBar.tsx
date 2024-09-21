import React from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type TabBarProps = {
	state: any;
	navigation: any;
	descriptors: any;
};

type RouteNames = "home" | "explore" | "bookmark" | "profile";

const icons: Record<RouteNames, (props: any) => JSX.Element> = {
	home: (props: any) => (
		<AntDesign name='home' size={26} color={"black"} {...props} />
	),
	explore: (props: any) => (
		<FontAwesome name='globe' size={26} color={"black"} {...props} />
	),
	bookmark: (props: any) => (
		<AntDesign name='book' size={26} color={"black"} {...props} />
	), // Changed to "book" as AntDesign does not have "bookmarks-outline"
	profile: (props: any) => (
		<AntDesign name='user' size={26} color={"black"} {...props} />
	),
};

const TabBar: React.FC<TabBarProps> = ({ state, navigation, descriptors }) => {
	return (
		<View className='flex flex-row absolute bottom-0 mx-0.5 opacity-80 p-5 justify-between items-center bg-[#231F20] rounded-full'>
			{state.routes.map((route: any, index: number) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				// Ensure `route.name` is typed as one of the keys in the `icons` object
				const iconName = route.name as RouteNames;

				return (
					<TouchableOpacity
						className='flex-1 justify-center items-center'
						key={route.name}
						accessibilityRole='button'
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}>
						{icons[iconName]({
							color: isFocused ? "#FFFFFF" : "#231F20",
						})}
						<Text style={{ color: isFocused ? "#FFFFFF" : "#231F20" }}>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default TabBar;
