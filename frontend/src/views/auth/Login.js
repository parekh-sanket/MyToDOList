/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from '../../Auth';
import React, { useState } from 'react';
import axios from "axios";
import './auth.css';

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://sanket-todolist-backend.herokuapp.com/api/";

const Login = () => {


	const initialState = {
		username: "",
		password: "",
		loading: false,
		error: false
	}

	const { authState, dispatch } = useAuthContext();
	const [state, setState] = useState(initialState);
	const navigate = useNavigate();

	const handleInputChange = (e) => {

		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const loginHandler = (e) => {
		e.preventDefault();

		setState({ ...state, loading: true, error: null })
		console.log(state)
		console.log(authState)

		axios.post(baseURL + "token/", {
			username: state.username,
			password: state.password,
		})
			.then((res) => {
				dispatch({
					"type": "LOGIN",
					"payload": res.data
				})
			}).catch((err) => {
				// err["response"] if Django server is not running then it will give undefine otherwise give some object of error
				// err.response.data it will give api data which Django send with error like  {detail: 'No active account found with the given credentials'}

				const errorData = err["response"] ? err.response.data : "Network Error";
				console.log("err ", err);
				console.log("err[response] ", err["response"]);
				console.log("errorData ", errorData);
				setState({
					...state,
					loading: false,
					error: errorData,
				});
			});
	};

	const errorMessages = () => {
		return <p className="error text-center">Enter valid username or password</p>
	}
	const token = localStorage.getItem("Token");

	// htmlFor if user is Authenticate then we not allow to go login we redirect into home
	React.useEffect(() => {
		if (authState.isAuth) {
			navigate("/")
		}
	}, [])

	// if use login then automaticaly redirect into the Home
	React.useEffect(() => {
		if (authState.isAuth) {
			navigate("/")
		}
	}, [token])

	return <>
		<div className="color-blue">
			<div className="container">
				<div className="row">
					<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
						<div className="card border-0 shadow rounded-3 my-5">
							<div className="card-body p-4 p-sm-5">
								<h5 className="card-title text-center mb-3 fw-light fs-5">Logn In</h5>
								{state.error && errorMessages()}
								<form>
									<div className="form-floating mb-3">
										<input
											type="text"
											className="form-control"
											id="floatingInput"
											placeholder="username"
											name="username"
											value={state.username}
											onChange={(e) => handleInputChange(e)} />

										<label htmlFor="floatingInput">Username</label>
									</div>
									<div className="form-floating mb-3">
										<input
											type="password"
											className="form-control"
											id="floatingPassword"
											placeholder="Password"
											name="password"
											value={state.password}
											onChange={(e) => handleInputChange(e)}
										/>
										<label htmlFor="floatingPassword">Password</label>
									</div>

									<div className="form-check mb-3">
										<input
											className="form-check-input"
											type="checkbox"
											id="rememberPasswordCheck"
										/>
										<label className="form-check-label" htmlFor="rememberPasswordCheck">
											Remember password
										</label>
									</div>
									<div className="d-grid">
										<button
											className="btn btn-primary btn-login text-uppercase fw-bold button"
											type="submit"
											disabled={state.loading}
											onClick={(e) => loginHandler(e)}>
											{state.loading ? "Logging in..." : "Log In"}
										</button>
										<hr />
										<Link to="/signup" style={{ textDecoration: 'none'}} className = {"d-grid"} >
											<button
												className="btn btn-primary btn-login text-uppercase fw-bold button" type="submit">
												Sign Up
											</button>
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>;
};

export default Login;

// 							{state.loading ? "Logging in..." : "Log In"}
// 						</button>
// 						<hr />
						// <Link to="/signup">
						// 	<button classNameName="btn btn-md btn-primary" type="button">
						// 		Sign Up
						// 	</button>
						// </Link>{" "}
// 						&nbsp;
// 						<Link to="/">
// 							<button classNameName="btn btn-md btn-primary" type="button">
// 								Home
// 							</button>
// 						</Link>
// 					</form>
// 				</main>
// 		</div>
// 	</>;
// };

// export default Login;
