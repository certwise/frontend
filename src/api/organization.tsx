import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import Context from "../store/context";
import { useContext } from "react";
import { organization } from "../types/organization";

const create = (organization: organization) => {
	return axios.post(`${env.url}/organization`, organization);
};

const get = (id: string) => {
	return axios.get(`${env.url}/organization/${id}`);
};

const update = (organization: organization) => {
	return axios.put(`${env.url}/organization`, organization);
};

export const useCreate = () => {
	const { dispatch } = useContext(Context);
	const queryClient = useQueryClient();
	return useMutation(create, {
		onSuccess: (data) => {
			queryClient.invalidateQueries("user");
			console.log("data", data);
			window.location.href = "/onboard";
		},
		onError: (err) => {
			alert("Error creating organization");
			console.log("err", err);
		},
	});
};

export const useGet = (id: string) => {
	return useQuery("organization", () => get(id), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		onSuccess: (data) => {
			console.log("organization data", data);
		},
		refetchOnWindowFocus: false,
	});
};

export const useUpdate = () => {
	const query = useQueryClient();
	return useMutation(update, {
		onSuccess: (data) => {
			query.invalidateQueries("organization");
			console.log("data", data);
		},
		onError: (err) => {
			console.log("err", err);
		},
	});
};
