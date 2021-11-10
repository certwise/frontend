import { useQuery } from "react-query";
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

export const useGetRecipients = (id: string) => {
	return useQuery("recipients", () => getRecipients(id), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};

export const useGetRecipient = (id: string) => {
	return useQuery(["recipient", id], () => getRecipient(id), {
		refetchOnMount: false,
		refetchOnReconnect: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
};
