import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
export type group = {
	id?: string;
	name: string;
	description: string;
	created_at: Date;
	updated_at: Date;
	recipients: string[];
	institution: string;
};

const createGroup = (group: group) => {
	return axios.post(`${env.url}/group`, group);
};
const getGroup = (instituteId: string) => {
	console.log("Group query");
	return axios.get(`${env.url}/group/${instituteId}`);
};

const getGroups = (instituteId: string) => {
	console.log("Group querys");
	return axios.get(`${env.url}/group/all/${instituteId}`);
};

export const useCreateGroup = () => {
	const query = useQueryClient();
	return useMutation(createGroup, {
		onSuccess: (data) => {
			query.invalidateQueries("groups");
		},
	});
};

export const useGetGroups = (instituteId: string) => {
	return useQuery("groups", () => getGroups(instituteId), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useGetGroup = (instituteId: string) => {
	return useQuery(["group", instituteId], () => getGroup(instituteId), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};
