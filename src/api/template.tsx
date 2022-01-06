import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import axios from "axios";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useContext } from "react";
import { Context } from "../store";
import { makeid } from ".";
import { actions } from "../store";
import { template } from "../store/types/template";
import { image } from "../store/types/template/canvas";
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

const getSavedImage = (_id: string, organization: string) => {
	return getDownloadURL(
		ref(
			getStorage(),
			`${organization}/templates/${_id}/example/template_image.jpeg`
		)
	);
};

const getDefaultBaseImage = () => {
	return getDownloadURL(ref(getStorage(), `default_template_images/base.jpg`));
};

const getDefaultImageItem = () => {
	return getDownloadURL(ref(getStorage(), `default_template_images/image.jpg`));
};

export const useGetOne = (_id: string) => {
	return useQuery(["template", _id], () => getOne(_id), {
		refetchOnWindowFocus: false,
	});
};

export const useGetByOrganization = (uid: string) => {
	return useQuery("templates", () => getByOrganization(uid), {
		retry: 1,
	});
};

export const useUpdate = () => {
	const { dispatch } = useContext(Context);
	const queryClient = useQueryClient();
	return useMutation(update, {
		onMutate: (data) => {
			let template: template = { ...data };
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
		onSuccess: (data) => {
			dispatch(actions.templates.setTemplateSaving(false));
			dispatch(actions.templates.downloadCurrentTemplate(false));
			dispatch(
				actions.toast.makeToast({
					message: "Template saved",
					type: "success",
					duration: "long",
				})
			);
			queryClient.invalidateQueries(["templates", "template", data.data._id]);
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: "Error saving template!",
					type: "error",
					duration: "long",
				})
			);
		},
	});
};

export const useCreate = () => {
	const query = useQueryClient();
	return useMutation(create, {
		onSuccess: () => {
			query.invalidateQueries(["templates"]);
		},
		onError: (err: any) => {
			alert(err.response.data);
		},
	});
};

export const useGetSavedImage = (id_: string, organization: string) => {
	return useQuery(
		["templateImage", id_],
		() => getSavedImage(id_, organization),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: 1,
		}
	);
};

export const useGetDefaultBaseImage = () => {
	return useQuery("defaultTemplateImage", () => getDefaultBaseImage(), {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
};

export const useAddImage = () => {
	const { store, dispatch } = useContext(Context);
	//const query = useQueryClient();
	return useMutation(getDefaultImageItem, {
		onSuccess: (url) => {
			let im = new window.Image();
			im.crossOrigin = "anonymous";
			im.src = url;
			im.onload = () => {
				const width = store.templates.currentTemplate.canvas.width / 3;
				const ratio = width / im.width;
				const height = im.height * ratio;
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
					scaleX: 1,
					scaleY: 1,
					originalWidth: im.width,
					originalHeight: im.height,
					flipX: false,
					flipY: false,
				};
				dispatch(actions.templates.createImageItem(img));
				//query.invalidateQueries("templateImage");
			};
		},
	});
};
