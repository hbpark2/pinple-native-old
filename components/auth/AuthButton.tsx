import React from "react";
import styled from "styled-components/native";

import { ActivityIndicator } from "react-native";

const Button = styled.TouchableOpacity`
	background-color: ${(props) => props.theme.blue};
	padding: 15px 10px;
	border-radius: 5px;
	width: 100%;
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
	margin-top: 10px;
`;
const ButtonText = styled.Text`
	color: #fff;
	font-weight: 800;
	text-align: center;
	font-size: 16px;
`;

interface IAuthButton {
	onPress: () => void;
	disabled?: boolean;
	text: string;
	loading?: boolean;
}

const AuthButton: React.FC<IAuthButton> = ({
	onPress,
	disabled,
	text,
	loading,
}) => {
	return (
		<Button disabled={disabled} onPress={onPress}>
			{loading ? (
				<ActivityIndicator color="#fff" />
			) : (
				<ButtonText>{text}</ButtonText>
			)}
		</Button>
	);
};

export default AuthButton;
