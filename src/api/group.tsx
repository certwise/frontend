import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { group } from "../types/group";

const create = (group: group) => {
	return axios.post(`${env.url}/group`, group);
};
const getOne = (group: string) => {
	return axios.get(`${env.url}/group/${group}`);
};

const getByOrganization = (organization: string) => {
	return axios.get(`${env.url}/group/organization/${organization}`);
};
const update = (group: any) => {
	return axios.put(`${env.url}/group`, group);
};

export const useCreate = () => {
	const query = useQueryClient();
	return useMutation(create, {
		onSuccess: (data) => {
			query.invalidateQueries("groups");
		},
	});
};

export const useGetByOrganization = (instituteId: string) => {
	return useQuery("groups", () => getByOrganization(instituteId), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useGetGroup = (groupId: string) => {
	return useQuery(["group", groupId], () => getOne(groupId), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useUpdate = () => {
	const query = useQueryClient();
	return useMutation(update, {
		onSuccess: (data) => {
			query.invalidateQueries(["group", data?.data?._id]);
		},
	});
};
