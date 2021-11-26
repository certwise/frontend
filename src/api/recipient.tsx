import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { recipient } from "../store/certificates/types";

const create = (recipient: recipient) => {
	return axios.post(`${env.url}/recipient`, recipient);
};

const getOne = (id: string) => {
	return axios.get(`${env.url}/recipient/${id}`);
};

const getByOrganization = (organization: string) => {
	return axios.get(`${env.url}/recipient/organization/${organization}`);
};

const update = (recipient: any) => {
	return axios.put(`${env.url}/recipient`, recipient);
};

const getByGroup = (group: string) => {
	return axios.get(`${env.url}/recipient/group/${group}`);
};

export const useCreateRecipient = () => {
	const query = useQueryClient();
	return useMutation(create, {
		onSuccess: () => {
			query.invalidateQueries("recipients");
		},
		onError: (err: any) => {
			alert(err.response.data);
		},
	});
};

export const useGetByOrganization = (id: string) => {
	return useQuery("recipients", () => getByOrganization(id), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		onSuccess: (data) => {},
	});
};

export const useGetOne = (recipient: string) => {
	return useQuery(["recipient", recipient], () => getOne(recipient), {
		enabled: !!recipient,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchIntervalInBackground: false,
		refetchInterval: false,
	});
};

export const useUpdate = () => {
	const query = useQueryClient();
	return useMutation(update, {
		onSuccess: (data) => {
			console.log(data);
			query.invalidateQueries("recipients");
		},
	});
};

export const useGetByGroup = (group: string) => {
	return useQuery(["group-recipients", group], () => getByGroup(group), {
		enabled: !!group,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};
