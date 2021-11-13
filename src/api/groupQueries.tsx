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
	return axios.get(`${env.url}/group/${instituteId}`);
};

const getGroups = (instituteId: string) => {
	return axios.get(`${env.url}/group/all/${instituteId}`);
};
const setGroup = (group: any) => {
	return axios.put(`${env.url}/group`, group);
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

export const useGetGroup = (groupId: string) => {
	return useQuery(["group", groupId], () => getGroup(groupId), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useSetGroup = (id?: any) => {
	const query = useQueryClient();
	return useMutation(setGroup, {
		onSuccess: (data) => {
			query.invalidateQueries(["group", id, "groups"]);
		},
	});
};
