import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { recipient } from "../store/certificates/types";

const createRecipient = (recipient: recipient) => {
	return axios.post(`${env.url}/recipient`, recipient);
};

const getRecipient = (id: string) => {
	console.log("Recipient query");
	return axios.get(`${env.url}/recipient/${id}`);
};

const getRecipients = (id: string) => {
	console.log("Recipient querys");
	return axios.get(`${env.url}/institution/${id}`);
};

export const useCreateRecipient = () => {
	const query = useQueryClient();
	return useMutation(createRecipient, {
		onSuccess: () => {
			query.invalidateQueries("recipients");
		},
	});
};

export const useGetRecipients = (id: string) => {
	return useQuery("recipients", () => getRecipients(id), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		onSuccess: (data) => {
			console.log("Frp, useQuery gRs:", data.data.recipients);
		},
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

const setCustomFields = (instituteId: string, customFields: any) => {
	return axios.put(`${env.url}/institution/customFields`, {
		customFields,
		instituteId,
	});
};

// export const useSetCustomFields = (instituteId: string, customFields: any) => {
// 	const query = useQueryClient();
// 	return useMutation(setCustomFields, {
// 		onSuccess: () => {
// 			query.invalidateQueries("institutes");
// 		},
// 	});
// };
