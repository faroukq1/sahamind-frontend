import axios from "axios";

const HOST_NAME = process.env.EXPO_PUBLIC_HOST_NAME;

export const loginRequest = async (email: string, password: string) => {

	const response = await axios.post(`${HOST_NAME}/auth/login`, { email, password });
	return response.data;
};

export const registerRequest = async (
	email: string,
	password: string,
	username: string,
	role: string
) => {

	const response = await axios.post(`${HOST_NAME}/auth/register`, {
		email,
		password,
		username,
		role,
	});
	return response.data;
};
