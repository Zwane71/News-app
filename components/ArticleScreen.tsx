import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking";

interface Article {
	title: string;
	description: string;
	url: string;
	urlToImage: string;
}

const ArticlesScreen: React.FC = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch(
					"https://newsapi.org/v2/top-headlines?country=us&apiKey=cde39452fe2c458db85be6cf3e29d014"
				);
				const data = await response.json();
				console.log(data); // Log the response for debugging
				if (response.ok && data.articles && Array.isArray(data.articles)) {
					setArticles(data.articles);
				} else {
					setError("No articles found.");
				}
			} catch (error) {
				console.error(error); // Log the error for debugging
				setError("Something went wrong. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) {
		return <ActivityIndicator size='large' color='#0000ff' />;
	}

	if (error) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Text className='text-red-500'>{error}</Text>
			</View>
		);
	}

	if (articles.length === 0) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Text>No articles available.</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={articles}
			keyExtractor={(item, index) => `${item.url}-${index}`} // Ensure URLs are unique
			renderItem={({ item }) => (
				<TouchableOpacity
					className='p-4 border-b border-gray-300'
					onPress={() => {
						Linking.openURL(item.url); // Open the article in the browser
					}}>
					{item.urlToImage && (
						<Image
							source={{ uri: item.urlToImage }}
							className='w-full h-48 rounded-lg'
						/>
					)}
					<Text className='font-bold text-lg mt-2'>{item.title}</Text>
					<Text className='mt-1 text-gray-600'>{item.description}</Text>
					<Text className='text-blue-500 mt-2'>Read more</Text>
				</TouchableOpacity>
			)}
		/>
	);
};

export default ArticlesScreen;
