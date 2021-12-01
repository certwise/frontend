import { env } from "../config";
import axios from "axios";
import { user } from "../store/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Context } from "../store";
import { useContext } from "react";
import { signIn } from "../store/actions/user";

const get = (uid: string) => {
	return axios.get(`${env.url}/user/${uid}`);
};

const create = (user: user) => {
	return axios.post(`${env.url}/user`, user);
};

const update = (user: user) => {
	return axios.put(`${env.url}/user`, user);
};

export const useGet = (uid: string) => {
	return useQuery("user", () => get(uid), {
		enabled: !!uid,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useCreate = () => {
	return useMutation(create, {
		onSuccess: (data) => {
			window.location.href = "/onboard-organization";
		},
	});
};

export const useUpdate = () => {
	const query = useQueryClient();
	return useMutation(update, {
		onSuccess: () => {
			query.invalidateQueries("user");
		},
	});
};

export const useDelete = (uid: string) => {
	const query = useQueryClient();
	return useMutation(
		() => {
			return axios.delete(`${env.url}/user/${uid}`);
		},
		{
			onSuccess: () => {
				window.location.href = "/signup";
			},
		}
	);
};
