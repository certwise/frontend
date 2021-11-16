import { useContext } from "react";
import { useGetTemplatesByUidQuery } from "../../api/templateQueries";
import Context from "../../store/context";
import TemplateCard from "./TemplateCard";

function TemplatesGrid() {
	const { store, dispatch } = useContext(Context);
	const { isLoading, data, isError, error, refetch } =
		useGetTemplatesByUidQuery(store.user.uid);
	return (
		<>
			<h1 className="font-bold text-xl m-5">Choose a template</h1>
			<div className="m-5 grid grid-cols-12 gap-4">
				{!data && <TemplateCard key={0} template={""} />}
				{data?.data.map((template: any) => (
					<TemplateCard key={template.id} template={template} />
				))}
			</div>
		</>
	);
}

export default TemplatesGrid;
