import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function Pricing() {
	const [redirect, setredirect] = useState(false);
	const checkOut = async (plan: string) => {
		if (plan !== "custom") {
			const res = await axios.post(
				"http://localhost:5000/payments/create-checkout-session",
				{ plan: plan }
			);
			window.location.replace(res.data.url);
		} else {
			setredirect(true);
			window.location.href = "/payments/custom";
		}
	};
	if (redirect) return <Redirect to="/payments/custom" />;
	else
		return (
			<>
				<section className="box-border text-gray-900 bg-white border-0 border-gray-200 border-solid ">
					<div className="box-border max-w-6xl  px-4 pb-12 mx-auto border-solid sm:px-6 md:px-10 lg:px-12">
						<div className="flex flex-col items-center leading-7 text-center text-gray-900">
							<h2 className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-xl md:text-2xl">
								Pricing Options
							</h2>
							<p className="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid"></p>
						</div>
						<div
							className="grid mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-indigo-500 
                     lg:grid-cols-3 rounded-md"
						>
							<div className="box-border px-4 py-8 mb-6 text-center bg-white border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
								<h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-xl">
									Trial
								</h3>
								<p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
									7 days free trial
								</p>
								<p className="mt-1 leading-7 text-gray-900 border-0 border-solid">
									50 certificates
								</p>
								<p className="mt-1 leading-7 text-gray-900 border-0 border-solid">
									Single template
								</p>
								<div className="flex justify-center items-center  mt-6 text-gray-900 border-0 border-solid sm:mt-8">
									<p className="box-border m-0 text-3xl font-semibold leading-normal text-center border-0 border-gray-200">
										₹0
									</p>
									<p className=" my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
										then ₹1499/month
									</p>
								</div>

								<button
									onClick={() => checkOut("trial")}
									className="btn btn-primary mt-8"
								>
									Select Plan
								</button>
							</div>
							<div className="box-border px-4 py-8 mb-6 text-center bg-gray-100 border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
								<h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-xl">
									Standard
								</h3>
								<p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
									500 certificates/month
								</p>
								<p className="mt-1 leading-7 text-gray-900 border-0 border-solid">
									3 templates
								</p>
								<p className="mt-1 leading-7 text-gray-900 border-0 border-solid">
									Monthly subscription
								</p>
								<div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
									<p className="box-border m-0 text-3xl font-semibold leading-normal text-center border-0 border-gray-200">
										₹1499
									</p>
									<p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
										/month
									</p>
								</div>
								<button
									onClick={() => checkOut("standard")}
									className="btn btn-primary mt-8"
								>
									Select Plan
								</button>
							</div>
							<div className="box-border px-4 py-8 mb-6 text-center  border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
								<h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-xl">
									Custom
								</h3>
								<p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
									Contact us for letting us know your requirements
								</p>
								<p className="mt-1 leading-7 text-gray-900 border-0 border-solid"></p>
								<p className="mt-2 leading-7 text-gray-900 border-0 border-solid">
									Custom pricing
								</p>
								<div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
									<p className="box-border m-0 text-3xl font-semibold leading-normal text-center border-0 border-gray-200">
										₹Your Usage
									</p>
									<p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
										/time
									</p>
								</div>
								<button
									onClick={() => checkOut("custom")}
									className="btn btn-primary mt-8"
								>
									Contact Us
								</button>
							</div>
						</div>
					</div>
				</section>
			</>
		);
}

export default Pricing;
