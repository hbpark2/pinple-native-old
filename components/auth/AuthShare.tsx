import styled from "styled-components/native";

type TextInputProps = {
	disable?: boolean;
	lastOne?: boolean;
	value?: any;
	placeholder?: string;
	returnKeyType?: string;
	autoCapitalize?: string;
	placeholderTextColor?: string;
	onChangeText?: (text: string) => void;
	onSubmitEditing?: () => void;
};

export const TextInput = styled.TextInput<TextInputProps>`
	display: ${(props) => (props.disable ? "none" : "flex")};
	background-color: #fafafa;
	padding: 15px;
	border-radius: 4px;
	margin-bottom: 8px;
	margin-bottom: ${(props) => (props.lastOne ? "15px" : "8px")};
`;
