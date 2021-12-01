import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { actions, Context } from "../store";
import { useContext } from "react";
import { organization } from "../store/types/organization";

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
