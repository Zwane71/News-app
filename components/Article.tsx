import React, { useState } from "react";
import {
	View,
	TextInput,
	FlatList,
	Text,
	TouchableOpacity,
} from "react-native";
import axios from "axios";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);

	const API_KEY = "cde39452fe2c458db85be6cf3e29d014"; // Use your RapidAPI key here

	const handleSearch = async () => {
		if (searchQuery) {
			setLoading(true);
			const options = {
				method: "GET",
				url: "https://real-time-news-data.p.rapidapi.com/search",
				params: {
					query: searchQuery,
					limit: "10",
					time_published: "anytime",
					country: "US",
					lang: "en",
				},
				headers: {
					"x-rapidapi-key": API_KEY,
					"x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
				},
			};

			try {
				const response = await axios.request(options);
				setArticles(response.data.articles);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
				console.log("Loading complete");
			}
		}
	};

	const renderArticle = ({ item }: { item: any }) => (
		<View className='bg-white p-4 rounded-lg mb-4 shadow-lg'>
			<Text className='text-lg font-bold mb-2'>{item.title}</Text>
			<Text className='text-sm text-gray-600'>{item.description}</Text>
		</View>
	);

	return (
		<View className='flex-1 bg-gray-100 p-4'>
			<TextInput
				className='h-10 border border-gray-300 rounded-lg mb-4 px-3 bg-white'
				placeholder='Search for articles'
				value={searchQuery}
				onChangeText={(text) => setSearchQuery(text)}
			/>
			<TouchableOpacity
				className='bg-blue-500 p-3 rounded-lg mb-4'
				onPress={handleSearch}>
				<Text className='text-white text-center text-base font-bold'>
					Search
				</Text>
			</TouchableOpacity>
			{loading ? (
				<Text className='text-center text-lg'>Loading...</Text>
			) : (
				<FlatList
					data={articles}
					keyExtractor={(item) => item.url}
					renderItem={renderArticle}
				/>
			)}
		</View>
	);
};

export default Search;
