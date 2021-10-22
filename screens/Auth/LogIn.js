import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { logUserIn } from "../../apollo";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { TextInput } from "../../components/auth/AuthShare";

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			error
		}
	}
`;

export default function Login({ route }) {
	const { register, handleSubmit, setValue, watch } = useForm({
		defaultValues: {
			email: route?.params?.email,
			password: route?.params?.password,
		},
	});

	const passwordRef = useRef();

	const onCompleted = async (data) => {
		console.log(data);
		const {
			login: { ok, token },
		} = data;
		if (ok) {
			await logUserIn(token);
		}
	};

	const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
		onCompleted,
	});

	const onNext = (nextOne) => {
		nextOne?.current?.focus();
	};

	const onValid = (data) => {
		if (!loading) {
			logInMutation({
				variables: { ...data },
			});
		}
	};

	useEffect(() => {
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
				value={watch("email")}
				placeholder="휴대폰 번호 (- 없이 숫자만 입력)"
				returnKeyType="next"
				autoCapitalize="none"
				placeholderTextColor="gray"
				onChangeText={(text) => setValue("email", text)}
				onSubmitEditing={() => onNext(passwordRef)}
			/>

			<AuthButton
				text="인증문자 받기"
				loading={loading}
				disabled={!watch("email") || !watch("password")}
				onPress={handleSubmit(onValid)}
			/>
		</AuthLayout>
	);
}
