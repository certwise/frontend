import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { certificate } from "../store/certificates/types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getByOrganization = (organization: string) => {
	return axios.get(`${env.url}/certificate/organization/${organization}`);
};
const getById = async (id: string) => {
	return axios.get(`${env.url}/certificate/one/${id}`);
};
const getByTemplate = (template: string) => {
	return axios.get(`${env.url}/certificate/template/${template}`);
};
const create = (body: certificate) => {
	return axios.post(`${env.url}/certificate/one`, body);
};
const update = (body: certificate) => {
	return axios.put(`${env.url}/certificate/one`, body);
};

export const useGetByOrganization = (organization: string) => {
	return useQuery("certificates", () => getByOrganization(organization), {
		enabled: organization !== "",
		refetchOnMount: false,
	});
};

export const useGetById = (id: string) => {
	return useQuery("certificate", () => getById(id), {
		enabled: id !== "",
		refetchOnMount: false,
	});
};

export const useGetByTemplate = (template: string) => {
	return useQuery("certificates", () => getByTemplate(template), {
		enabled: template !== "",
		refetchOnMount: false,
	});
};

export const useGetImage = (reff: string) => {
	return useQuery(
		["certificateImage", reff],
		() => getDownloadURL(ref(getStorage(), reff)),
		{
			enabled: reff !== "",
		}
	);
};

export const useCreate = () => {
	return useMutation(create, {});
};

export const useUpdate = () => {
	const x = useQueryClient();
	return useMutation(update, {
		onSuccess: () => {
			x.invalidateQueries(["certificates"]);
		},
	});
};
