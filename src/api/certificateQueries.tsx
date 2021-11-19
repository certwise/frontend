import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { certificate } from "../store/certificates/types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getCertificatesByUid = (uid: string) => {
	return axios.get(`${env.url}/certificate/owner/${uid}`);
};
const getCertificateById = async (id: string) => {
	return axios.get(`${env.url}/certificate/one/${id}`);
};
const createCertificate = (body: any) => {
	return axios.post(`${env.url}/certificate/one`, body);
};
const editCertificate = (body: any) => {
	return axios.put(`${env.url}/certificate/one`, body);
};

export const useGetCertificatesByUid = (uid: string) => {
	return useQuery("certificates", () => getCertificatesByUid(uid), {
		enabled: uid !== "",
		refetchInterval: 50000,
	});
};

export const useGetCertificateById = (id: string) => {
	return useQuery("certificate", () => getCertificateById(id), {
		enabled: id !== "",
		refetchInterval: 1000,
	});
};

export const useGetCertificateImage = (reff: string) => {
	return useQuery(
		["certificateImage", reff],
		() => getDownloadURL(ref(getStorage(), reff)),
		{
			enabled: reff !== "",
		}
	);
};

export const useCreateCertificate = () => {
	return useMutation(createCertificate, {});
};

export const useEditCertificate = () => {
	const x = useQueryClient();
	return useMutation(editCertificate, {
		onSuccess: () => {
			x.invalidateQueries(["certificates"]);
		},
	});
};
