import { useQuery } from "react-query";
import { env } from "../config";
import axios from "axios";
import { certificate } from "../store/certificates/types";

const getCertificatesByUid = (uid: string) => {
	return axios.get(`${env.url}/certificate/owner/${uid}`);
};
const getCertificateById = async (id: string) => {
	return axios.get(`${env.url}/certificate/${id}`);
};
const createCertificate = (certificate: certificate) => {
	return axios.post(`${env.url}/certificate`, certificate);
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
