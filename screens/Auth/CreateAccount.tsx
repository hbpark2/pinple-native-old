import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { TextInput } from "../../components/auth/AuthShare";
import styled from "styled-components/native";
import { logUserIn } from "../../apollo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, TextInput as TextInputCpt } from "react-native";

const FormError = styled.Text`
	color: tomato;
	margin-bottom: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
	mutation createAccount(
		$nickName: String!
		$gender: String
		$category: String!
	) {
		createAccount(nickName: $nickName, gender: $gender, category: $category) {
			ok
			error
		}
	}
`;
const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			error
		}
	}
`;

const CreateAccount: React.FC<NativeStackScreenProps<any, "CreateAccount">> = ({
	navigation,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		errors,
		setError,
		clearErrors,
		watch,
	} = useForm();

	const usernameRef = useRef<TextInputCpt>(null);
	const lastNameRef = useRef<TextInputCpt>(null);
	const emailRef = useRef<TextInputCpt>(null);
	const passwordRef = useRef<TextInputCpt>(null);

	//로그인
	const onLoginCompleted = async (data: any) => {
		const {
			login: { ok, token, error },
		} = data;
		if (ok) {
			await logUserIn(token);
			navigation.navigate("Tabs");
		} else {
			console.log(error);
		}
	};

	const [login] = useMutation(LOGIN_MUTATION, {
		onCompleted: onLoginCompleted,
	});

	const onCompleted = (data: any) => {
		const {
			createAccount: { ok, error },
		} = data;
		const { email, password, lastName, firstName } = getValues();

		if (!ok) {
			console.log("aa");
			return setError("result", {
				message: error,
			});
		}

		if (ok) {
			if (password === "1234" && lastName === "" && firstName === "") {
				console.log("kakao login");
				login({
					variables: {
						email,
						password: "1234",
					},
				});
			} else {
				Alert.alert("회원가입이 완료되었습니다 :)");
				navigation.navigate("LogIn", {
					email,
					password,
				});
			}
		}
	};

	const [CreateAccountMutation, { loading }] = useMutation(
		CREATE_ACCOUNT_MUTATION,
		{ onCompleted }
	);

	const onNext = (nextOne: MutableRefObject<TextInputCpt | null>) => {
		nextOne?.current?.focus();
	};

	const onValid = (data: any) => {
		if (loading) {
			return;
		}
		console.log(data);
		if (!loading) {
			CreateAccountMutation({
				variables: { ...data },
			});
		}
	};

	useEffect(() => {
		register("firstName", {
			required: false,
		});
		register("lastName", {
			required: false,
		});
		register("username", {
			required: true,
		});
		register("email", {
			required: true,
		});
		register("password", {
			required: true,
		});
	}, [register]);

	return (
		<AuthLayout>
			<TextInput
				autoFocus
				placeholder="First Name"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => setValue("firstName", text)}
				onSubmitEditing={() => onNext(lastNameRef)}
			/>
			<TextInput
				ref={lastNameRef}
				placeholder="Last Name"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => setValue("lastName", text)}
				onSubmitEditing={() => onNext(emailRef)}
			/>
			<TextInput
				value={watch("email")}
				ref={emailRef}
				placeholder="Email"
				placeholderTextColor="gray"
				keyboardType="email-address"
				returnKeyType="next"
				onChangeText={(text) => setValue("email", text)}
				onSubmitEditing={() => onNext(usernameRef)}
			/>
			<TextInput
				value={watch("username")}
				ref={usernameRef}
				placeholder="User Name"
				autoCapitalize="none"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => {
					setValue("username", text);
					clearErrors();
				}}
				onSubmitEditing={() => onNext(passwordRef)}
			/>

			<TextInput
				value={watch("password")}
				ref={passwordRef}
				placeholder="Password"
				placeholderTextColor="gray"
				secureTextEntry
				returnKeyType="done"
				lastOne={true}
				onChangeText={(text) => setValue("password", text)}
				onSubmitEditing={handleSubmit(onValid)}
			/>

			{errors && <FormError>{errors?.result?.message}</FormError>}
			<AuthButton text="Create Account" onPress={handleSubmit(onValid)} />
		</AuthLayout>
	);
};

export default CreateAccount;
