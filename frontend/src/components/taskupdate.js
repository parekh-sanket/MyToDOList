import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCrudContext } from "../Crud";
import axios from "axios"

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://sanket-todolist-backend.herokuapp.com/api/";


const TaskUpdate = () => {
	const { data, dispatch } = useCrudContext();

	const [taskData, setTaskData] = useState(data.taskForUpdate);

	console.log("taskData", taskData);

	const handleClose = () => dispatch({ type: "UPDATE_TASK_CLOSE" });

	const handleInputChange = (e) => {
		setTaskData({
			...taskData,
			[e.target.name]: e.target.value,
		});
	};

	const updateHandler = (e) => {
		e.preventDefault();

		axios.put(baseURL + `todo-list/${taskData.id}/`,taskData, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				"authorization": `Bearer ${JSON.parse(localStorage.getItem("Token")).access}`
			}
		}).then((res) => {
			axios.get(baseURL + 'todo-list/', {
				headers: {
					"authorization": `Bearer ${JSON.parse(localStorage.getItem("Token")).access}`
				}
			}).then((res)=>{
				dispatch({
					type : "LOGGEDIN_FATCH",
					payload : res.data
				})
			}).catch((err)=>{
				dispatch({
					type : "LOGGEDIN_FATCH_ERROR",
					payload : err["response"] ? err.response.data : "Network Error"
				})
			})
		}).catch((err) => {
			dispatch({
				type : "LOGGEDIN_FATCH_ERROR",
				payload : err["response"] ? err.response.data : "Network Error"
			})
		})

		handleClose()
	}

	return (
		<Modal show={data.updateTask} onHide={handleClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Update Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
								name="title"
								value={taskData.title}
								onChange={handleInputChange}
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
								value={taskData.priority}
								onChange={handleInputChange}>
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
								value={taskData.status}
								onChange={handleInputChange}
								aria-label="Default select example">
								<option value="0">Pending</option>
								<option value="1">Completed</option>
							</select>
						</div>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						onClick={(e) => updateHandler(e)}
					>
						Save Changes
					</button>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default TaskUpdate;
