import React, { useState } from "react";
import { useAuthContext } from "../Auth";
import jwt from 'jwt-decode'
import axios from "axios";
import { useCrudContext } from "../Crud";

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://sanket-todolist-backend.herokuapp.com/api/";

const initialState = {
	task: "",
	priority: '1',
	status: '0',
};

const TaskBox = () => {

	const [data, setData] = useState(initialState);
	const { dispatch } = useCrudContext();
	const { authState } = useAuthContext();

	const handleInputChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};


	const addTaskHandler = (e) => {
		e.preventDefault();
		console.log(data);

		if (authState.isAuth === false) {
			alert("Please Login First!");
			return;
		}


		let token = JSON.parse(localStorage.getItem("Token"));
		let user = jwt(token.access).user_id

		const pdata = {}
		pdata["title"] = data["task"]
		pdata["status"] = data["status"]
		pdata["priority"] = data["priority"]
		pdata["user"] = user

		console.log(pdata);

		// using this whole the list refresh so don't use 
		// dispatch({
		// 	type: "ADD_TASK_LOADING"
		// })

		axios
			.post(baseURL + "todo-list/", JSON.stringify(pdata), {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `Bearer ${token.access}`,
				}
			})
			.then((res) => {
				console.log("Ok Created", res);
				dispatch({
					type: "ADD_TASK",
					payload: res.data
				})
			})
			.catch((err) => {
				dispatch({
					type: "ADD_TASK_ERROR",
					payload: err["response"] ? err.response.data : "Network Error"
				})
			});
	};

	return (
		<div className="col-md-4">
			<div className="h-100 p-5 text-white bg-dark rounded-3">
				<h2>Add Task</h2>
				<br />
				<form>
					<div className="row mb-3">
						<label htmlFor="inputTask" className="col-sm-3 col-form-label">
							Task
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								id="inputTask"
								name="task"
								value={data.task}
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="priority" className="col-sm-3 col-form-label">
							Priority
						</label>
						<div className="col-sm-10">
							<select
								id="priority"
								className="form-select"
								name="priority"
								onChange={(e) => handleInputChange(e)}
								value={data.priority}
							>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="5">Five</option>
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="status" className="col-sm-3 col-form-label">
							Status
						</label>
						<div className="col-sm-10">
							<select
								id="status"
								className="form-select"
								name="status"
								aria-label="Default select example"
								value={data.status}
								onChange={(e) => handleInputChange(e)}
							>
								<option value="0">Pending</option>
								<option value="1">Completed</option>
							</select>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary button"
						onClick={(e) => addTaskHandler(e)}
					>
						Add Task
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskBox;
