import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./auth.css";

const baseURL = "https://sanket-todolist-backend.herokuapp.com/api/";

let initialState = {
	username: "",
	email: "",
	password1: "",
	password2: "",
	loading: false,
	error: null,
};

const Signup = () => {

	const navigate = useNavigate();
	const [data, setData] = useState(initialState);
	const { authState, dispatch } = useAuthContext()

	const handleInputChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	var token = "";

	const signupHandler = (e) => {
		e.preventDefault();

		setData({
			...data,
			loading: true,
			error: null,
		});

		if (data.username === "" || data.email === "" || data.password1 === "" || data.password2 === "") {
			setData({
				...data,
				loading: false,
				error: "All fields are mandatory"
			})
		} else if (data.password1.length < 4) {
			setData({
				...data,
				loading: false,
				error: "Password is too short"
			})
		} else {
			axios
				.post(baseURL + "signup/", {
					username: data.username,
					email: data.email,
					password1: data.password1,
					password2: data.password2,
				})
				.then((res) => {
					console.log("res ", res);
					dispatch({
						type: "LOGIN",
						payload: res.data,
					});
				})
				.catch((err) => {
					console.log("err ", err);
					const errorData = err["response"] ? err.response.data.msg : "Network Error";
					setData({
						...data,
						loading: false,
						error: errorData,
					});
				});
		}
	}
	token = localStorage.getItem("Token");

	useEffect(() => {
		if (authState.isAuth) {
			navigate("/")
		}
	}, [])

	console.log("token ",token);
	useEffect(() => {
		if (authState.isAuth) {
			navigate("/")
		}
	}, [token])

	return (
		<div className="color-blue-he">
			<div className="container">
				<div className="row">
					<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
						<div className="card border-0 shadow rounded-3 my-5">
							<div className="card-body p-3 p-sm-5">
								<h5 className="card-title text-center mb-3 fw-light fs-5">Sign Up</h5>
								{(data.error != null) ? <p className="error text-center">{data.error}</p> : <span></span>}
								<form>
									<div className="form-floating mb-3">
										<input
											type="text"
											className="form-control"
											id="username"
											placeholder="username"
											name="username"
											value={data.username}
											onChange={(e) => handleInputChange(e)}
										/>
										<label htmlFor="username">Username</label>
									</div>
									<div className="form-floating mb-3">
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder="Email-ID"
											name="email"
											value={data.email}
											onChange={(e) => handleInputChange(e)}
										/>
										<label htmlFor="email">Email</label>
									</div>
									<div className="form-floating mb-3">
										<input
											type="password"
											className="form-control"
											id="password1"
											placeholder="password1"
											name="password1"
											value={data.password1}
											onChange={(e) => handleInputChange(e)}
										/>
										<label htmlFor="username1">Password</label>
									</div>
									<div className="form-floating mb-3">
										<input
											type="password"
											className="form-control"
											id="password2"
											placeholder="Password2"
											name="password2"
											value={data.password2}
											onChange={(e) => handleInputChange(e)}
										/>
										<label htmlFor="password2">Password (Again)</label>
									</div>
									<div className="d-grid">
										<button
											className="btn btn-primary btn-login text-uppercase fw-bold button"
											type="submit"
											disabled={data.loading}
											onClick={(e) => signupHandler(e)}>
											{data.loading ? "Signing in..." : "Sign Up"}
										</button>
									</div>
									<hr />
									<div className="row">
										<div className="col-12 col-md-6">
											<Link to="/login">
												<button className="btn btn-primary btn-login text-uppercase fw-bold button-in" type="button">
													Log In
												</button>
											</Link>{" "}
										</div>
										<div className="col-12 col-md-6">
											<Link to="/">
												<button className="btn btn-primary btn-login text-uppercase fw-bold button-in" type="button">
													Home
												</button>
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
