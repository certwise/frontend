import { useContext, useEffect } from "react";
import ToastUI from "./ToastUI";
import { actions, Context } from "../store";
import { Toast as ToastType } from "../store/types/toast";

function Toast() {
	const { store, dispatch } = useContext(Context);
	const toasts = store.toasts;
	useEffect(() => {
		if (toasts.length > 0) {
			const toast = toasts[0];
			if (toast.duration !== "eternal")
				setTimeout(
					() => {
						dispatch(actions.toast.removeToast(0));
					},
					toast.duration === "long" ? 5000 : 3000
				);
		}
	}, [store.toasts]);
	return (
		<>
			{toasts.map((toast: ToastType, index) => {
				if (index < 6)
					return (
						<ToastUI
							key={index}
							message={toast.message}
							type={toast.type}
							className="mx-3 my-1 z-5000"
						/>
					);
				else return null;
			})}
		</>
	);
}

export default Toast;
