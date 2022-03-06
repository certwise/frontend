import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import { actions, Context } from "../store";
import { useContext } from "react";
import { organization } from "../store/types/organization";
import { API } from ".";

const create = (organization: organization) => {
	return API(`${env.url}/organization`, "post", organization);
};

const get = (id: string) => {
	return API(`${env.url}/organization/${id}`, "get");
};

const update = (organization: organization) => {
	return API(`${env.url}/organization`, "put", organization);
};

export const useCreate = () => {
	const queryClient = useQueryClient();
	return useMutation(create, {
		onSuccess: (data) => {
			queryClient.invalidateQueries("user");
			window.location.href = "/onboard";
		},
		onError: (err) => {
			alert("Error creating organization");
		},
	});
};

export const useGet = (id: string) => {
	const { dispatch } = useContext(Context);

	return useQuery("organization", () => get(id), {
		onSuccess: (data) => {
			dispatch(actions.organization.setOrganization(data.data));
		},
		refetchOnWindowFocus: false,
	});
};

export const useUpdate = () => {
	const query = useQueryClient();
	return useMutation(update, {
		onSuccess: (data) => {
			query.invalidateQueries("organization");
		},
		onError: (err) => {},
	});
};
