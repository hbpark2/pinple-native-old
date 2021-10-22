import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../screens/Feed/PhotoScreen";
import Profile from "../screens/Profile/Profile";
import Feed from "../screens/Feed/Feed";
import Search from "../screens/Search/Search";
import Notifications from "../screens/Feed/Notifications";
import Me from "../screens/Profile/Me";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import EditProfile from "../screens/Auth/EditProfile";
import CommentScreen from "../screens/CommentScreen";
import Home from "../screens/Home/Home";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
	return (
		<Stack.Navigator
			headerMode="screen"
			screenOptions={{
				headerBackTitleVisible: false,
				headerTintColor: "#333",
				headerStyle: {
					backgroundColor: "#fff",
					shadowColor: "#333",
				},
			}}
		>
			{screenName === "Home" ? (
				<Stack.Screen
					name={"Home"}
					component={Home}
					options={{ headerShown: false }}
				/>
			) : null}

			{screenName === "Feed" ? (
				<Stack.Screen
					name={"Feed"}
					component={Feed}
					options={{
						headerTitle: () => (
							<Image
								style={{ maxHeight: 40 }}
								resizeMode="contain"
								source={require("../assets/logo.png")}
							/>
						),
					}}
				/>
			) : null}
			{screenName === "Search" ? (
				<Stack.Screen name={"Search"} component={Search} />
			) : null}

			{screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}

			<Stack.Screen
				name={"Notifications"}
				component={Notifications}
				options={{
					headerTitle: () => (
						<Image
							style={{ maxHeight: 40 }}
							resizeMode="contain"
							source={require("../assets/logo.png")}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="EditProfile"
				options={{
					headerBackImage: ({ tintColor }) => (
						<Ionicons color={tintColor} name="close" size={28} />
					),
					headerBackTitleVisible: false,
					title: "프로필 수정",
					headerTintColor: "#333",
					headerStyle: {
						backgroundColor: "#fffef2",
						shadowOpacity: 1,
					},
				}}
				component={EditProfile}
			/>
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Photo" component={Photo} />
			<Stack.Screen name="Likes" component={Likes} />
			<Stack.Screen name="CommentScreen" component={CommentScreen} />
		</Stack.Navigator>
	);
}
