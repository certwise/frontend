import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useContext } from "react";
import Context from "../store/context";
import { getNewImage } from "../store/templates/elements";
import { makeid } from ".";
import { templateActions } from "../store";
import { template } from "../types/template";
import { image } from "../types/template/canvas";
const getOne = (id: string) => {
	return axios.get(`${env.url}/template/one/` + id);
};

const getByOrganization = (uid: string) => {
	return axios.get(`${env.url}/template/organization/` + uid);
};

const update = (data: template) => {
	return axios.put(`${env.url}/template/update`, data);
};

const create = (data: template) => {
	return axios.post(`${env.url}/template`, data);
};

const getSavedImage = (id: string, uid: string) => {
	return getDownloadURL(
		ref(getStorage(), `${uid}/templates/${id}/example/template_image.jpeg`)
	);
};

const getDefaultBaseImage = () => {
	return getDownloadURL(ref(getStorage(), `default_template_images/base.jpg`));
};

const getDefaultImageItem = () => {
	return getDownloadURL(ref(getStorage(), `default_template_images/image.jpg`));
};

export const useGetOne = (id: string) => {
	return useQuery(["template", id], () => getOne(id), {
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
		refetchInterval: false,
	});
};

export const useGetByOrganization = (uid: string) => {
	return useQuery("templates", () => getByOrganization(uid), {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 1,
	});
};

export const useUpdate = () => {
	const { dispatch } = useContext(Context);
	const queryClient = useQueryClient();
	return useMutation(update, {
		onMutate: (data) => {
			let template = { ...data };
			console.log("In onMutuate: ", template);
			delete template.canvas.activeItem;
			delete template.canvas.stageRef;
			template.canvas.items.map((item) => {
				if (item.type === "image") {
					delete item.src;
					return item;
				} else return item;
			});
			return template;
		},
		onSuccess: () => {
			dispatch(templateActions.setTemplateSaving(false));
			queryClient.invalidateQueries("templates");
		},
		onError: (err: any) => {
			alert("Error saving template" + err.message);
		},
	});
};

export const useCreate = () => {
	const query = useQueryClient();
	return useMutation(create, {
		onSuccess: () => {
			query.invalidateQueries("templates");
		},
		onError: (err: any) => {
			alert(err.response.data);
		},
	});
};

export const useGetSavedImage = (id: string, uid: string) => {
	return useQuery(["templateImage", id], () => getSavedImage(id, uid), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: 1,
	});
};

export const useGetDefaultBaseImage = () => {
	return useQuery("defaultTemplateImage", () => getDefaultBaseImage(), {});
};

export const useAddImage = () => {
	const { store, dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(getDefaultImageItem, {
		onSuccess: (url) => {
			let im = new window.Image();
			im.crossOrigin = "anonymous";
			im.src = url;
			const width = store.templates.currentTemplate.canvas.width / 3;
			const ratio = width / im.width;
			const height = im.height * ratio;
			im.onload = () => {
				const img: image = {
					isConstant: false,
					id: makeid(12),
					name: "new image",
					type: "image",
					src: im,
					draggable: true,
					x: 100,
					y: 100,
					width,
					height,
					storageRef: "default_template_images/image.jpg",
					opacity: 100,
					rotation: 0,
					alt: "",
					scaleX: 0,
					scaleY: 0,
					originalWidth: 0,
					originalHeight: 0,
					flipX: false,
					flipY: false,
				};
				dispatch(templateActions.createImageItem(img));
				query.invalidateQueries("templateImage");
			};
		},
	});
};
