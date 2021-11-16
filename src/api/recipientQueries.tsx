import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { recipient } from "../store/certificates/types";

const createRecipient = (recipient: recipient) => {
	return axios.post(`${env.url}/recipient`, recipient);
};

const getRecipient = (id: string) => {
	return axios.get(`${env.url}/recipient/${id}`);
};

const getInstitution = (id: string) => {
	return axios.get(`${env.url}/institution/${id}`);
};
const setCustomFields = (institutionId: string, customFields: any) => {
	console.log("Func", institutionId, customFields);
	return axios.put(`${env.url}/institution/customFields`, {
		fields: customFields,
		institutionId,
	});
};
const editRecipient = (recipient: any) => {
	return axios.put(`${env.url}/recipient`, recipient);
};
export const useCreateRecipient = () => {
	const query = useQueryClient();
	return useMutation(createRecipient, {
		onSuccess: () => {
			query.invalidateQueries("institute");
		},
	});
};

export const useGetInstitution = (id: string) => {
	return useQuery("institute", () => getInstitution(id), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		onSuccess: (data) => {},
		refetchOnWindowFocus: false,
	});
};

export const useGetRecipient = (id: string) => {
	return useQuery(["recipient", id], () => getRecipient(id), {
		enabled: !!id,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useSetCustomFields = () => {
	const query = useQueryClient();
	return useMutation(
		(data: { institutionId: string; customFields: Array<{ name: string }> }) =>
			setCustomFields(data.institutionId, data.customFields),
		{
			onSuccess: () => {
				query.invalidateQueries("institute");
				console.log("Success	");
			},
		}
	);
};

export const useEditRecipient = () => {
	const query = useQueryClient();
	return useMutation(editRecipient, {
		onSuccess: (data) => {
			query.invalidateQueries(["recipient", data.data]);
		},
	});
};

const getAllRecipients = (recipients: Array<string>) => {
	let promises = [];
	for (let i in recipients) {
		console.log("Recipients", recipients[i]);
		promises.push(axios.get(`${env.url}/recipient/${recipients[i]}`));
	}
	return Promise.all(promises)
		.then((responses) => {
			return Promise.all(
				responses.map((response) => {
					return response;
				})
			);
		})
		.then((data) => data);
};

export const useGetAllRecipients = (recipients: Array<string>) => {
	return useQuery(["recipients"], () => getAllRecipients(recipients), {
		enabled: !!recipients,
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};
