// src/screens/NewsScreen.tsx
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	Linking,
	ActivityIndicator,
} from "react-native";

const API_KEY = "4794b7dd4b0b4695bb60b1398e230b58"; // Your API key

const NewsScreen = () => {
	const [sources, setSources] = useState<any[]>([]);
	const [filteredSources, setFilteredSources] = useState<any[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState("Sort/Filter Options");
	const [refreshing, setRefreshing] = useState(false); // State for refresh

	useEffect(() => {
		fetchSources();
	}, []);

	const fetchSources = async () => {
		setRefreshing(true);
		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`
			);
			const data = await response.json();
			setSources(data.sources);
			setFilteredSources(data.sources);
		} catch (error) {
			console.error(error);
		} finally {
			setRefreshing(false);
		}
	};

	const filterSources = () => {
		if (isFiltered) {
			setFilteredSources(sources); // Reset to all sources
		} else {
			setFilteredSources(
				sources.filter((source) => source.category === "news")
			);
		}
		setIsFiltered(!isFiltered);
		setDropdownVisible(false);
	};

	const sortSources = (criteria: string) => {
		const sorted = [...filteredSources].sort((a, b) => {
			if (criteria === "name") {
				return a.name.localeCompare(b.name);
			} else {
				return a.id.localeCompare(b.id); // Example: Sort by ID
			}
		});
		setFilteredSources(sorted);
		setSelectedOption(`Sorted by ${criteria}`);
		setDropdownVisible(false);
	};

	return (
		<View className='p-4'>
			<View className=' flex items-center justify-center m-auto text-center  mt-4'>
				<Text className=' font-black'>Explore World wide news</Text>
			</View>
			<FlatList
				data={filteredSources}
				keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique key
				renderItem={({ item }) => (
					<TouchableOpacity
						className='p-4 border-b border-gray-300'
						onPress={() => {
							if (item.url) {
								Linking.openURL(item.url);
							}
						}}>
						{item.urlToImage && (
							<Image
								source={{ uri: item.urlToImage }}
								className='w-full h-48 rounded-lg'
							/>
						)}
						<Text className='font-bold text-lg mt-2'>{item.name}</Text>
						<Text className='mt-1 text-gray-600'>{item.description}</Text>
						<Text className='text-blue-500 mt-2'>Read more</Text>
					</TouchableOpacity>
				)}
				refreshing={refreshing} // Add refreshing state
				onRefresh={fetchSources} // Fetch data when pulled down
			/>
		</View>
	);
};

export default NewsScreen;
