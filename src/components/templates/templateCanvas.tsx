import { useContext, useEffect, useState } from "react";
import * as api from "../../api/templates";
import Context from "../../store/context";
import { useParams } from "react-router-dom";
import CanvasContainer from "../builder/canvasContainer";
import { templateActions } from "../../store";
import getCurrentTemplate from "./getCurrentTemplate";
import { loadFontIntoCSS } from "../builder/textComponent/fontLoader";
import { template } from "../../store/templates/types";
function TemplateCanvas() {
	const { store, dispatch } = useContext(Context);
	const { templateId }: any = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isValidUrl, setIsValidUrl] = useState(true);

	useEffect(() => {
		dispatch(templateActions.isEditingTemplate(true));
		setIsLoading(true);
		api
			.getTemplateByName(templateId, store.user.uid)
			.then((template) => {
				console.log("1920:", template);
				if (template) {
					setIsValidUrl(true);
					return setCurrentTemplate(template);
				}
			})
			.then(() => {
				setIsLoading(false);
				dispatch({ type: "DONE_SAVING", payload: false });
			});
		return () => {
			dispatch(templateActions.isEditingTemplate(false));
		};
	}, [store.templates.doneSaving]);

	const setCurrentTemplate = (srcTemplate: template) => {
		console.log("setting current template");
		return new Promise((resolve, reject) => {
			dispatch(templateActions.setCurrentTemplateNull());
			getCurrentTemplate(srcTemplate.canvas.items).then((res) => {
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
				dispatch(templateActions.setCurrentTemplate(srcTemplate));
				console.log("Set current temp", srcTemplate);
				resolve(true);
			});
		});
	};
	return (
		<>
			{" "}
			{isLoading && <div className="w-screen h-screen loading">Loading</div>}
			{!isLoading && isValidUrl && <CanvasContainer />}
		</>
	);
}

export default TemplateCanvas;
