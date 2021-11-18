import { useMutation, useQuery } from "react-query";
import { env } from "../config";
import axios from "axios";
import { certificate } from "../store/certificates/types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const getCertificatesByUid = (uid: string) => {
	return axios.get(`${env.url}/certificate/owner/${uid}`);
};
const getCertificateById = async (id: string) => {
	return axios.get(`${env.url}/certificate/${id}`);
};
const createCertificate = (body: any) => {
	return axios.post(`${env.url}/certificate/one`, body);
};

export const useGetCertificatesByUid = (uid: string) => {
	return useQuery("certificates", () => getCertificatesByUid(uid), {
		enabled: uid !== "",
	});
};

export const useGetCertificateById = (id: string) => {
	return useQuery("certificate", () => getCertificateById(id), {
		enabled: id !== "",
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
