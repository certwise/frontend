import { useMutation, useQuery } from "react-query";
import { env } from "../config";
import axios from "axios";
import { template } from "../store/templates/types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getTemplateById = (id: string) => {
	return axios.get(`${env.url}/template/one/` + id);
};

const getTemplatesByUid = (uid: string) => {
	return axios.get(`${env.url}/template/uid/` + uid);
};

const updateTemplate = (data: template) => {
	return axios.put(`${env.url}/template/update`, data);
};

const createTemplate = (data: template) => {
	return axios.post(`${env.url}/template`, data);
};

const getTemplateImage = (id: string, uid: string) => {
	return getDownloadURL(
		ref(getStorage(), `${uid}/templates/${id}/example/template_image.jpeg`)
	);
};
const getDefaultTemplateImage = () => {
	return getDownloadURL(ref(getStorage(), `default_template_images/base.jpg`));
};

export const useGetTemplateByIdQuery = (id: string) => {
	return useQuery(["template", id], () => getTemplateById(id));
};

export const useGetTemplatesByUidQuery = (uid: string) => {
	return useQuery("templates", () => getTemplatesByUid(uid), {});
};

export const useUpdateTemplateQuery = (data: template) => {
	return useQuery(["updateTemplate", data.id], () => updateTemplate(data));
};

export const useCreateTemplateQuery = () => {
	return useMutation(createTemplate, {
		onSuccess: (data) => {
			console.log("Successfully created template", data);
		},
	});
};

export const useGetTemplateImageQuery = (id: string, uid: string) => {
	return useQuery(["templateImage", id], () => getTemplateImage(id, uid), {
		refetchOnMount: true,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};

export const useGetDefaultTemplateImageQuery = () => {
	return useQuery("defaultTemplateImage", () => getDefaultTemplateImage(), {});
};
