import { useMutation, useQuery, useQueryClient } from "react-query";
import { env } from "../config";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Context } from "../store";
import { API, makeid } from ".";
import { actions } from "../store";
import { template } from "../store/types/template";
import { image } from "../store/types/template/canvas";
import { cloneDeep } from "lodash";
import { useContext } from "react";

const getOne = (id: string) => {
	return API(`${env.url}/template/one/` + id, "get");
};

const getByOrganization = (uid: string) => {
	return API(`${env.url}/template/organization/` + uid, "get");
};

const update = (data: any) => {
	if (data.canvas.activeItem) delete data.canvas.activeItem;
	console.log("update", data);
	return API(`${env.url}/template/update`, "put", data);
};

const create = (data: template) => {
	return API(`${env.url}/template`, "post", data);
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

const archive = (id: string) => {
	return API(`${env.url}/template/archive/` + id, "put");
};

const unarchive = (id: string) => {
	return API(`${env.url}/template/unarchive/` + id, "put");
};

const deleteTemplate = (id: string) => {
	return API(`${env.url}/template/` + id, "delete");
};

const getNumberOfCertificateInTemplate = (id: string) => {
	return API(`${env.url}/template/numberOfCertificates/` + id, "get");
};

export const useGetOne = (_id: string) => {
	return useQuery(["template", _id], () => getOne(_id), {
		refetchOnWindowFocus: false,
	});
};

export const useGetByOrganization = (uid: string) => {
	return useQuery("templates", () => getByOrganization(uid), {
		retryOnMount: true,
		refetchOnMount: true,
		refetchOnReconnect: true,
		retry: 1,
	});
};

export const useUpdate = () => {
	const { dispatch } = useContext(Context);
	const queryClient = useQueryClient();
	return useMutation(update, {
		onMutate: (data) => {
			let template: template = cloneDeep(data);
			delete template.canvas.activeItem;
			delete template.canvas.stageRef;
			template.canvas.items.map((item) => {
				if (item.type === "image") {
					delete item.src;
					return item;
				} else return item;
			});
			console.log("template", template);
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
			console.log("data", data.data._id);
			queryClient.invalidateQueries(["template", data.data._id]);
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
			onError: (err: any) => console.log(err),
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

export const useArchive = () => {
	const { dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(archive, {
		onSuccess: (data) => {
			query.invalidateQueries(["templates", "template"]);
			dispatch(
				actions.toast.makeToast({
					message: "Template archived",
					type: "success",
					duration: "long",
				})
			);
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: "Error archiving template!",
					type: "error",
					duration: "long",
				})
			);
		},
	});
};

export const useUnarchive = () => {
	const { dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(unarchive, {
		onSuccess: (data) => {
			query.invalidateQueries(["template"]);
			dispatch(
				actions.toast.makeToast({
					message: "Template unarchived",
					type: "success",
					duration: "long",
				})
			);
		},
		onError: (err: any) => {
			dispatch(
				actions.toast.makeToast({
					message: "Error archiving template!",
					type: "error",
					duration: "long",
				})
			);
		},
	});
};

export const useDelete = () => {
	const { dispatch } = useContext(Context);
	const query = useQueryClient();
	return useMutation(deleteTemplate, {
		onSuccess: (data) => {
			query.invalidateQueries(["templates", "template"]);
			dispatch(
				actions.toast.makeToast({
					message: "Template has been deleted!",
					type: "success",
					duration: "long",
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

export const useGetNumberOfCertificateInTemplate = (id: string) => {
	return useQuery(
		["templateCertificateCount", id],
		() => getNumberOfCertificateInTemplate(id),
		{
			refetchOnWindowFocus: false,
			onError: (err: any) => console.log(err),
		}
	);
};
