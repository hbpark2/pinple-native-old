import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default ({ iconName, color, focused, size }) => {
	return (
		<Ionicons
			name={focused ? iconName : `${iconName}-outline`}
			color={color}
			size={size ? size : 22}
		/>
	);
};
