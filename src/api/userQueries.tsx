import { env } from "../config";
import axios from "axios";
import { user } from "../store/auth/types";

export const getUser = async (uid: string): Promise<user | false> => {
	try {
		const res = await axios.get(env.url + "/user/" + uid);
		return res.data as user;
	} catch (err) {
		return false;
	}
};

export const createUser = async (user: user) => {
	try {
		const res = await axios.post(env.url + "/user", user);
		return res.data;
	} catch (err) {
		return false;
	}
};

export const updateUser = async (user: user) => {
	try {
		const res = await axios.put(env.url + "/user", user);
		return res.data;
	} catch (err) {
		console.log(err);
		return false;
	}
};
