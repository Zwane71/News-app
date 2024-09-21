import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";

interface Article {
	title: string;
	description: string;
	url: string;
	urlToImage: string;
}

const ArticlesScreen: React.FC = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch(
					"https://newsapi.org/v2/top-headlines?country=us&apiKey=cde39452fe2c458db85be6cf3e29d014"
				);
				const data = await response.json();
				setArticles(data.articles);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) {
		return <ActivityIndicator size='large' color='#0000ff' />;
	}

	return (
		<FlatList
			data={articles}
			keyExtractor={(item) => item.url}
			renderItem={({ item }) => (
				<TouchableOpacity
					className='p-4 border-b border-gray-300'
					onPress={() => {
						/* Handle article press */
					}}>
					{item.urlToImage && (
						<Image
							source={{ uri: item.urlToImage }}
							className='w-full h-48 rounded-lg'
						/>
					)}
					<Text className='font-bold text-lg mt-2'>{item.title}</Text>
					<Text className='mt-1 text-gray-600'>{item.description}</Text>
				</TouchableOpacity>
			)}
		/>
	);
};

export default ArticlesScreen;
