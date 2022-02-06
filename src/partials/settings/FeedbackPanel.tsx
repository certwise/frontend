import axios from "axios";
import { useContext, useState } from "react";
import { env } from "../../config";
import { actions, Context } from "../../store";

function FeedbackPanel() {
	const { store, dispatch } = useContext(Context);
	const [ratingLevel, setRatingLevel] = useState(5);
	const [submitState, setSubmitState] = useState<
		boolean | "loading" | "failed"
	>(false);
	const [feedback, setFeedback] = useState("");

	const submitFeedback = () => {
		setSubmitState("loading");
		axios
			.post(`${env.url}/feedback`, {
				ratingLevel,
				feedback,
				user: store.user.uid,
				userName: store.user.name,
				organization: store.organization._id,
				organizationName: store.organization.name,
				timestamp: new Date(),
				time: new Date().getTime(),
			})
			.then(() => {
				setSubmitState(true);
				dispatch(
					actions.toast.makeToast({
						message: "Feedback submitted successfully",
						type: "success",
						duration: "long",
					})
				);
			})
			.catch(() => {
				setSubmitState("failed");
				dispatch(
					actions.toast.makeToast({
						message: "Uh oh! Something went wrong. Please try again later",
						type: "error",
						duration: "long",
					})
				);
			});
	};
	return (
		<div className="flex-grow">
			{/* Panel body */}
			<div className="p-6 space-y-6">
				<div>
					<h2 className="text-2xl text-gray-800 font-bold mb-4">
						Give Feedback
					</h2>
					<div className="text-sm">
						Our product depends on customer feedback to improve the overall
						experience!
					</div>
				</div>

				{/* Rate */}
				<section>
					<h3 className="text-xl leading-snug text-gray-800 font-bold mb-6">
						How would you rate your experience using Certwise?
					</h3>
					<div className="w-full max-w-xl">
						<div className="relative">
							<div
								className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200"
								aria-hidden="true"
							></div>
							<ul className="relative flex justify-between w-full">
								<li className="flex">
									<button
										onClick={() => setRatingLevel(1)}
										className={`w-3 h-3 rounded-full ${
											ratingLevel === 1
												? "bg-blue-500 border-2 border-blue-500"
												: "bg-white border-2 border-gray-400"
										}`}
									>
										<span className="sr-only">1</span>
									</button>
								</li>
								<li className="flex">
									<button
										onClick={() => setRatingLevel(2)}
										className={`w-3 h-3 rounded-full ${
											ratingLevel === 2
												? "bg-blue-500 border-2 border-blue-500"
												: "bg-white border-2 border-gray-400"
										}`}
									>
										<span className="sr-only">2</span>
									</button>
								</li>
								<li className="flex">
									<button
										onClick={() => setRatingLevel(3)}
										className={`w-3 h-3 rounded-full ${
											ratingLevel === 3
												? "bg-blue-500 border-2 border-blue-500"
												: "bg-white border-2 border-gray-400"
										}`}
									>
										<span className="sr-only">3</span>
									</button>
								</li>
								<li className="flex">
									<button
										onClick={() => setRatingLevel(4)}
										className={`w-3 h-3 rounded-full ${
											ratingLevel === 4
												? "bg-blue-500 border-2 border-blue-500"
												: "bg-white border-2 border-gray-400"
										}`}
									>
										<span className="sr-only">4</span>
									</button>
								</li>
								<li className="flex">
									<button
										onClick={() => setRatingLevel(5)}
										className={`w-3 h-3 rounded-full ${
											ratingLevel === 5
												? "bg-blue-500 border-2 border-blue-500"
												: "bg-white border-2 border-gray-400"
										}`}
									>
										<span className="sr-only">5</span>
									</button>
								</li>
							</ul>
						</div>
						<div className="w-full flex justify-between text-sm text-gray-500 italic mt-3">
							<div>Not at all</div>
							<div>Extremely likely</div>
						</div>
					</div>
				</section>

				{/* Tell us in words */}
				<section>
					<h3 className="leading-snug text-gray-800 font-bold mb-5">
						Tell us your experience in words and report any bugs
					</h3>
					{/* Form */}
					<label className="sr-only" htmlFor="feedback">
						Leave a feedback
					</label>
					<textarea
						id="feedback"
						className="form-textarea w-full focus:border-gray-300"
						rows={4}
						placeholder="I really enjoy…"
						onChange={(e) => setFeedback(e.target.value)}
					></textarea>
				</section>
			</div>

			{/* Panel footer */}
			<footer>
				<div className="flex flex-col px-6 py-5 border-t border-gray-200">
					<div className="flex self-end">
						<button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
							Cancel
						</button>
						{submitState === false && (
							<button
								onClick={() => submitFeedback()}
								className="btn bg-blue-500 hover:bg-blue-600 text-white ml-3"
							>
								Submit Feedback
							</button>
						)}
						{submitState === true && (
							<button className="btn bg-green-600 text-white ml-3">
								Feedback received!
							</button>
						)}
						{submitState === "loading" && (
							<button className="btn bg-blue-400 text-white ml-3">
								Submitting feedback...
							</button>
						)}
						{submitState === "failed" && (
							<button className="btn bg-yellow-600 text-white ml-3">
								Try again later
							</button>
						)}
					</div>
				</div>
			</footer>
		</div>
	);
}

export default FeedbackPanel;
