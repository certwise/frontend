import { env } from "../config";
import axios from "axios";
import { user } from "../store/user/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Context from "../store/context";
import { useContext } from "react";
import { signIn } from "../store/user/actions";

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

export const useCreate = (user: user) => {
	const { dispatch } = useContext(Context);
	return useMutation(create, {
		onSuccess: (data) => {
			dispatch(signIn(data.data));
		},
	});
};

export const useUpdate = (user: user) => {
	const query = useQueryClient();
	return useMutation(update, {
		onSuccess: () => {
			query.invalidateQueries("user");
		},
	});
};
