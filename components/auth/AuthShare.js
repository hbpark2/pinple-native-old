import styled from "styled-components/native";

export const TextInput = styled.TextInput`
	display: ${(props) => (props.disable ? "none" : "flex")};
	background-color: #fafafa;
	padding: 15px;
	border-radius: 4px;
	margin-bottom: 8px;
	margin-bottom: ${(props) => (props.lastOne ? "15px" : "8px")};
`;
