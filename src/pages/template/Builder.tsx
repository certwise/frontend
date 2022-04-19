//FIXME
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Context } from "../../store";
import { useHistory, useParams } from "react-router-dom";
import CanvasContainer from "../../partials/template/builder/canvasContainer";
import { actions } from "../../store";
import getCurrentTemplateItems from "../../partials/template/getCurrentTemplate";
import {
	loadFontIntoCSS,
	loadFonts,
} from "../../partials/template/builder/textComponent/fontLoader";
import { template } from "../../store/types";
import { useGetOne } from "../../api/template";
import Loader from "../../partials/Loader";
import EmptyState from "../../partials/EmptyState";
function TemplateBuilder() {
	const { store, dispatch } = useContext(Context);
	const { id }: any = useParams();
	const history = useHistory();
	const template = useGetOne(id);
	const [isLoading, setIsLoading] = useState(true);
	const numberOfFonts = store.templates.numberOfFonts;

	useEffect(() => {
		dispatch(actions.templates.isEditingTemplate(true));
		dispatch(actions.templates.setNumberOfFonts(100));
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, []);

	useEffect(() => {
		dispatch(actions.templates.setFontsLoading(true));
		loadFonts("popularity").then((fonts) => {
			fonts = fonts.slice(0, numberOfFonts);
			for (let i in fonts) {
				try {
					let apiUrl = [];
					apiUrl.push("https://fonts.googleapis.com/css?family=");
					apiUrl.push(fonts[i].family.replace(/ /g, "+"));
					var url = apiUrl.join("");
					let style = document.createElement("link");
					style.href = url;
					style.rel = "stylesheet";
					document.head.appendChild(style);
				} catch {}
			}
			dispatch(actions.templates.setFonts(fonts));
			dispatch(actions.templates.setFontsLoading(false));
		});
	}, [store.templates.numberOfFonts]);

	useEffect(() => {
		dispatch(actions.templates.isEditingTemplate(true));
		if (!template.data?.data) setIsLoading(true);
		if (template.data) {
			setCurrentTemplate(template.data.data).then(() => {
				setIsLoading(false);
			});
		}
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, [template.isFetching]);

	useEffect(() => {
		if (template.data && !store.templates.downloadCurrentTemplate) {
			setCurrentTemplate(template.data.data).then(() => {
				setIsLoading(false);
			});
		}
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, [store.templates.downloadCurrentTemplate]);

	const setCurrentTemplate = (srcTemplate: template) => {
		return new Promise((resolve, reject) => {
			dispatch(actions.templates.setCurrentTemplateNull());
			getCurrentTemplateItems(srcTemplate.canvas.items).then((res) => {
				for (let i in res) {
					let imgItem = res[i];
					srcTemplate.canvas.items.map((item) => {
						if (item.id === imgItem.id) return imgItem;
						else return item;
					});
				}
				srcTemplate.canvas.items.forEach((item) => {
					if (item.type === "text") {
						if (item.fontFamily) {
							loadFontIntoCSS(item.fontFamily);
						}
					}
				});
				dispatch(actions.templates.setCurrentTemplate(srcTemplate));
				resolve(true);
			});
		});
	};
	return (
		<>
			{isLoading && (
				<div className="h-screen flex  justify-center items-center">
					<Loader />
				</div>
			)}
			{!isLoading && !template.data?.data.isArchived && <CanvasContainer />}
			{template.data?.data.isArchived && (
				<EmptyState
					title="This template is archived"
					description="This template has been archived."
					button="Back to template"
					onClick={() => history.push("/template/view/" + id)}
				/>
			)}
		</>
	);
}

export default TemplateBuilder;
