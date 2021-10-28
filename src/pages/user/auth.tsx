import React, { useContext } from "react";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import Context from "../../store/context";
import { signIn as signIntoStore, signOut as signOutStore } from "../../store";
function Auth() {
	const auth = getAuth();
	const { store, dispatch } = useContext(Context);
	const signIn = () => {
		console.log("Auth");
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				dispatch(signIntoStore(user));
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const signOutUser = () => {
		signOut(auth)
			.then(() => {
				dispatch(signOutStore());
				window.location.href = "/";
			})
			.catch(() => {
				alert("Signout failed");
			});
	};
	const [img, setimg] = React.useState<any>();
	React.useEffect(() => {
		if (store.user.isSignedIn) {
			setimg(store.user.photoURL);
		}
	}, [store.user]);
	return (
		<>
			{store.user.isSignedIn ? (
				<div className="p-3">
					<div className="text-3xl text-primary font-bold">
						Hello {store.user.displayName}
						<div style={{ marginTop: "15px" }}>
							<img src={store.user.photoURL || undefined} alt="" />
						</div>
						<button className="btn btn-primary mt-2" onClick={signOutUser}>
							Sign Out
						</button>
					</div>
				</div>
			) : (
				<div className="m-3">
					<div className="text-3xl ">Sign in to continue</div>
					<button className="btn btn-primary" onClick={signIn}>
						SignIn
					</button>
				</div>
			)}
		</>
	);
}

export default Auth;
