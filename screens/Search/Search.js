import React, { useEffect } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.background};
`;

const MessageContainer = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const MessageText = styled.Text`
	margin-top: 15px;
	font-weight: 600;
`;

const Input = styled.TextInput`
	width: ${(props) => props.width / 2}px;
	background-color: #333;
	border: none;
	border-radius: 10px;
	padding: 5px 10px;
	color: #fff;
`;

const SEARCH_PLANTS = gql`
	query searchPlant($keyword: String!) {
		searchPlant(keyword: $keyword) {
			ok
			error
			plants {
				id
				title
				caption
				plantLikes
				isLiked
				images {
					file
				}
			}
		}
	}
`;

export default function Search({ navigation }) {
	const numColumns = 4;
	const { width } = useWindowDimensions();
	const { setValue, register, watch, handleSubmit } = useForm();

	const onValid = ({ keyword }) => {
		startQueryFn({
			variables: {
				keyword,
			},
		});
	};

	const SearchBox = () => (
		<Input
			width={width}
			placeholderTextColor="#fff"
			placeholder="장소, 지역으로 검색하세요."
			autoCapitalize="none"
			returnKeyLabel="Search"
			returnKeyType="search"
			autoCorrect={false}
			onChangeText={(text) => setValue("keyword", text)}
			onSubmitEditing={handleSubmit(onValid)}
		/>
	);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: SearchBox,
		});

		register("keyword", {
			required: true,
			minLength: 2,
		});
	}, []);

	return (
		<DismissKeyboard>
			<Container></Container>
		</DismissKeyboard>
	);
}
