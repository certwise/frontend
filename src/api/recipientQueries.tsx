import { useQuery } from "react-query";
import { env } from "../config";
import axios from "axios";
import { recipient } from "../store/certificates/types";

const createRecipient = (recipient: recipient) => {
	return axios.post(`${env.url}/recipient`, recipient);
};
const getRecipient = (id: string) => {
	return axios.get(`${env.url}/recipient/${id}`);
};

const getRecipients = () => {
	return axios.get(`${env.url}/instituition/recepients`);
};
