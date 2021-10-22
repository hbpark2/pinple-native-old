import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.theme.background};
	padding: 0 20px;
`;

const Logo = styled.Image`
	max-width: 50%;
	width: 100%;
	height: 100px;
	margin: 0 auto 40px;
`;
const LogoText = styled.Text`
	align-items: center;
	text-align: center;
	padding: 20px;
	margin-bottom: 100px;
	font-weight: 600;
	font-size: 32px;
	letter-spacing: 10px;
`;

const AuthLayout: React.FC<React.ReactNode> = ({ children }) => {
	return (
		<DismissKeyboard>
			<Container>
				<KeyboardAvoidingView
					style={{
						width: "100%",
					}}
					behavior="position"
					keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 20}
				>
					<LogoText>PINPLE</LogoText>

					{children}
				</KeyboardAvoidingView>
			</Container>
		</DismissKeyboard>
	);
};

export default AuthLayout;
