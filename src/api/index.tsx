import axios from "axios";
import { useQuery } from "react-query";
import { env } from "../config";
import { getAuth } from "firebase/auth";

export const API = async (
	url: string,
	method: "get" | "post" | "put" | "delete",
	data?: any
) => {
	const token = await getAuth().currentUser?.getIdToken(false);
	return axios({
		url: url,
		method: method,
		data: data,
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	});
};

export const makeid = (length: number) => {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

const getDashboard = async (organizationId: string) => {
	return API(`${env.url}/dashboard/${organizationId}`, "get");
};

export const valiateEarlyAccessInviteCode = async (
	email: string,
	code: string
) => {
	const result = await API(
		`${env.url}/earlyaccess?email=${email}&inviteCode=${code}`,
		"get"
	);
	return result.data;
};

export const useDashboard = (organizationId: string) => {
	return useQuery("dashboard", () => getDashboard(organizationId), {});
};
