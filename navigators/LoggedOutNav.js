import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Auth/Welcome";
import LogIn from "../screens/Auth/LogIn";
import CreateAccount from "../screens/Auth/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
	return (
		<Stack.Navigator
			screenOptions={{
				title: "PINPLE",
				headerBackTitleVisible: false,
				headerTintColor: "#333",
				headerTitle: false,
				headerTransparent: true,
			}}
		>
			<Stack.Screen
				name="Welcome"
				options={{ headerShown: false }}
				component={Welcome}
			/>
			<Stack.Screen name="LogIn" component={LogIn} />

			<Stack.Screen name="CreateAccount" component={CreateAccount} />
		</Stack.Navigator>
	);
}
