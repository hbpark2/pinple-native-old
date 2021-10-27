import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../../../components/auth/AuthButton";
import { TextInput } from "../../../components/auth/AuthShare";

const Authentication = () => {
	const { register, handleSubmit, setValue, watch } = useForm();

	useEffect(() => {
		register("phoneNumber", {
			required: true,
		});
	}, [register]);

	const onValid = () => {};

	return (
		<>
			<TextInput
				value={watch("phoneNumber")}
				placeholder="휴대폰 번호 (- 없이 숫자만 입력)"
				returnKeyType="next"
				autoCapitalize="none"
				placeholderTextColor="gray"
				onChangeText={(text) => setValue("phoneNumber", text)}
				onSubmitEditing={handleSubmit(onValid)}
			/>

			<AuthButton
				text="인증문자 받기"
				// loading={loading}
				disabled={!watch("email")}
				onPress={handleSubmit(onValid)}
			/>
		</>
	);
};
export default Authentication;
