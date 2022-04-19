import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import { group } from "../store/types/group";
import { actions } from "../store";
import { Context } from "../store";
import { useContext } from "react";
import { API } from ".";

const create = (group: group) => {
	return API(`${env.url}/group`, "post", group);
};
const getOne = (group: string) => {
	return API(`${env.url}/group/${group}`, "get");
};

const getByOrganization = (organization: string) => {
	return API(`${env.url}/group/organization/${organization}`, "get");
};
const update = (group: any) => {
	return API(`${env.url}/group`, "put", group);
};

export const useCreate = () => {
	const query = useQueryClient();
	const { dispatch } = useContext(Context);
	return useMutation(create, {
		onSuccess: (data) => {
			query.invalidateQueries("groups");
			dispatch(
				actions.toast.makeToast({
					message: "Group created!",
					type: "success",
					duration: "long",
				})
			);
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: err.response.data,
					type: "error",
					duration: "long",
				})
			);
		},
	});
};

export const useGetByOrganization = (instituteId: string) => {
	return useQuery("groups", () => getByOrganization(instituteId), {
		refetchOnWindowFocus: true,
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
			query.invalidateQueries("groups");
		},
	});
};
