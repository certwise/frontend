import { env } from "../config";
import { user } from "../store/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API } from ".";

const get = (uid: string) => {
	return API(`${env.url}/user/${uid}`, "get");
};

const create = (user: user) => {
	return API(`${env.url}/user`, "post", user);
};

const update = (user: user) => {
	return API(`${env.url}/user`, "put", user);
};

export const useGet = (uid: string) => {
	return useQuery("user", () => get(uid), {
		enabled: !!uid,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		onSuccess: (data) => {},
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
			return API(`${env.url}/user/${uid}`, "delete");
		},
		{
			onSuccess: () => {
				window.location.href = "/signup";
			},
		}
	);
};
