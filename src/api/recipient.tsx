import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import { actions, types } from "../store";
import { Context } from "../store";
import { useContext } from "react";
import { API } from ".";
import { recipient } from "../store/types";

const create = (recipient: types.recipient) => {
	return API(`${env.url}/recipient`, "post", recipient);
};

const createBulk = (recipients: types.recipient[]) => {
	return API(`${env.url}/recipient/bulk`, "post", recipients);
};

const getOne = (id: string) => {
	return API(`${env.url}/recipient/${id}`, "get");
};

const getByOrganization = (organization: string) => {
	return API(`${env.url}/recipient/organization/${organization}`, "get");
};

const update = (recipient: recipient) => {
	return API(`${env.url}/recipient`, "put", recipient);
};

const updateBulk = (recipient: recipient[]) => {
	return API(`${env.url}/recipient/bulk`, "put", recipient);
};

const getByGroup = (group: string) => {
	return API(`${env.url}/recipient/group/${group}`, "get");
};

export const useCreate = () => {
	const query = useQueryClient();
	const { dispatch } = useContext(Context);
	return useMutation(create, {
		onSuccess: () => {
			query.invalidateQueries("recipients");
			dispatch(
				actions.toast.makeToast({
					message: "Created recipient!",
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

export const useCreateBulk = () => {
	const query = useQueryClient();
	const { dispatch } = useContext(Context);
	return useMutation(createBulk, {
		onSuccess: (data) => {
			query.invalidateQueries("recipients");
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

export const useGetByOrganization = (id: string) => {
	const { dispatch } = useContext(Context);
	return useQuery("recipients", () => getByOrganization(id), {
		onSuccess: (data) => {
			dispatch(actions.recipients.setAll(data.data));
		},
	});
};

export const useGetOne = (recipient: string) => {
	return useQuery(["recipient", recipient], () => getOne(recipient), {
		enabled: !!recipient,
	});
};

export const useUpdate = () => {
	const query = useQueryClient();
	const { dispatch } = useContext(Context);
	return useMutation(update, {
		onSuccess: (data) => {
			query.invalidateQueries("recipients");
			dispatch(
				actions.toast.makeToast({
					message: "Updated recipient",
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

export const useUpdateBulk = () => {
	const query = useQueryClient();
	const { dispatch } = useContext(Context);
	return useMutation(updateBulk, {
		onSuccess: (data) => {
			query.invalidateQueries("recipients");
			dispatch(
				actions.toast.makeToast({
					message: "Updated recipient",
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

export const useGetByGroup = (group: string) => {
	return useQuery(["group-recipients", group], () => getByGroup(group), {
		enabled: !!group,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};
