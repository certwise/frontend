import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";

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
	return axios.get(`${env.url}/dashboard/${organizationId}`);
};

export const valiateEarlyAccessInviteCode = async (
	email: string,
	code: string
) => {
	const result = await axios.get(
		`${env.url}/earlyaccess?email=${email}&inviteCode=${code}`
	);
	return result.data;
};

export const useDashboard = (organizationId: string) => {
	return useQuery("dashboard", () => getDashboard(organizationId), {});
};
