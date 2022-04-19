import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import { certificate } from "../store/types";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Context, actions } from "../store";
import { useContext } from "react";
import { API } from ".";

const getByOrganization = (organization: string) => {
	return API(`${env.url}/certificate/organization/${organization}`, "get");
};
const getById = async (id: string) => {
	return API(`${env.url}/certificate/one/${id}`, "get");
};
const getByTemplate = (template: string) => {
	return API(`${env.url}/certificate/template/${template}`, "get");
};
const create = (body: certificate) => {
	return API(`${env.url}/certificate/one`, "post", body);
};
const createMany = (body: certificate[]) => {
	return API(`${env.url}/certificate/many`, "post", body);
};
const update = (body: certificate) => {
	return API(`${env.url}/certificate/one`, "put", body);
};
const issueOne = (certificateId: string) => {
	return API(`${env.url}/certificate/issue/one/${certificateId}`, "post");
};

export const useGetByOrganization = (organization: string) => {
	return useQuery("certificates", () => getByOrganization(organization), {
		refetchInterval: 1000 * 60 * 60,
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

export const useGetImage = (isEnabled: boolean, reff: string) => {
	return useQuery(
		["certificateImage", reff],
		() => getDownloadURL(ref(getStorage(), reff)),
		{
			enabled: reff !== "" && isEnabled,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);
};

export const useCreate = () => {
	const { dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(create, {
		onSuccess: () => {
			query.invalidateQueries("certificates");
			dispatch(
				actions.toast.makeToast({
					message: "Certificate created",
					type: "success",
					duration: "short",
				})
			);
			dispatch(actions.certificate.resetCreateCertificate());
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: err.response.data,
					type: "error",
					duration: "long",
				})
			);
		},
	});
};

export const useCreateMany = () => {
	const { dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(createMany, {
		onMutate: (body) => {
			if (body.length === 0) {
				dispatch(
					actions.toast.makeToast({
						message: "No certificates to create",
						type: "error",
						duration: "short",
					})
				);
				return new Error("No certificates to create");
			} else return body;
		},
		onSuccess: () => {
			query.invalidateQueries("certificates");
			dispatch(
				actions.toast.makeToast({
					message: "Certificate created",
					type: "success",
					duration: "short",
				})
			);
			dispatch(actions.certificate.resetCreateCertificate());
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: err.response.data,
					type: "error",
					duration: "long",
				})
			);
		},
	});
};

export const useUpdate = () => {
	const x = useQueryClient();
	return useMutation(update, {
		onSuccess: () => {
			x.invalidateQueries(["certificates"]);
		},
	});
};

export const useIssueOne = () => {
	const { dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(issueOne, {
		onSuccess: () => {
			query.invalidateQueries("certificates");
			dispatch(
				actions.toast.makeToast({
					message: "Certificate issued",
					type: "success",
					duration: "short",
				})
			);
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: err.response.data,
					type: "error",
					duration: "long",
				})
			);
		},
	});
};
