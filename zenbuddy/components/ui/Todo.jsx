import React from "react";
import { useState, useEffect, useRef } from "react";
import "../todo.css";
import Button from "./Button";

const Todo = () => {
	const [todoInput, setTodoInput] = useState("");

	const addTask = () => {
		if (inputBox.value === "") {
			alert("Write your task in the input field");
		} else {
			const newTask = document.createElement("div");
			newTask.classList.add("todo-list-tasks");
			newTask.innerHTML = `
                <div class="todo-list-task-label">
                    <input type="checkbox" class="task2" name="task">
                    <label class="task">${inputBox.value}</label>
                </div>
                <button class="todo-list-tasks-button">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.1875 2.34375V3.90625H22.6562C23.0877 3.90625 23.4375 4.25603 23.4375 4.6875C23.4375 5.11897 23.0877 5.46875 22.6562 5.46875H21.815L20.4826 22.1242C20.3526 23.7483 18.9968 25 17.3675 25H7.63249C6.00324 25 4.64737 23.7483 4.51744 22.1242L3.185 5.46875H2.34375C1.91228 5.46875 1.5625 5.11897 1.5625 4.6875C1.5625 4.25603 1.91228 3.90625 2.34375 3.90625H7.8125V2.34375C7.8125 1.04933 8.86183 0 10.1562 0H14.8438C16.1382 0 17.1875 1.04933 17.1875 2.34375ZM9.375 2.34375V3.90625H15.625V2.34375C15.625 1.91228 15.2752 1.5625 14.8438 1.5625H10.1562C9.72478 1.5625 9.375 1.91228 9.375 2.34375ZM7.03123 7.85703L7.81248 21.1383C7.83782 21.569 8.20753 21.8976 8.63826 21.8723C9.06899 21.847 9.39762 21.4773 9.37228 21.0465L8.59103 7.76528C8.5657 7.33455 8.19598 7.00592 7.76526 7.03125C7.33453 7.05659 7.00589 7.4263 7.03123 7.85703ZM17.2347 7.0326C16.804 7.00726 16.4343 7.33589 16.409 7.76662L15.6277 21.0479C15.6024 21.4786 15.931 21.8483 16.3617 21.8736C16.7925 21.899 17.1622 21.5704 17.1875 21.1396L17.9688 7.85838C17.9941 7.42765 17.6655 7.05793 17.2347 7.0326ZM12.5 7.03125C12.0685 7.03125 11.7188 7.38103 11.7188 7.8125V21.0938C11.7188 21.5252 12.0685 21.875 12.5 21.875C12.9315 21.875 13.2813 21.5252 13.2813 21.0938V7.8125C13.2813 7.38103 12.9315 7.03125 12.5 7.03125Z" fill="#858585"/>
                    </svg>                            
                </button>
            `;

			inputBox.value = "";
			divContainer.appendChild(newTask);
			saveData();
			attachEventListeners(newTask);
		}
	};

	function saveData() {
		const tasks = Array.from(document.querySelectorAll(".todo-list-tasks"));

		const data = tasks.map((task) => {
			const checkbox = task.querySelector(".task2");
			const labelWord = task.querySelector(".task");

			return {
				text: labelWord.textContent,
				checked: checkbox.checked,
			};
		});

		localStorage.setItem("data", JSON.stringify(data));
	}

	return (
		<>
			<div class="todo-list-body-wrapper">
				<div class="todo-list-heading-container">
					<div class="todo-list-heading">To Do List</div>
				</div>
				<div class="todo-list-task-done-add-container">
					<div class="todo-list-task-done-container">
						<div class="todo-list-tasks">
							<div class="todo-list-task-label">
								<input
									type="checkbox"
									class="task2"
									id="task"
								/>
								<label class="task" for="task">
									{" "}
									Drink more water
								</label>
							</div>
							<Button type="ghost">
								<svg
									width="25"
									height="25"
									viewBox="0 0 25 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M17.1875 2.34375V3.90625H22.6562C23.0877 3.90625 23.4375 4.25603 23.4375 4.6875C23.4375 5.11897 23.0877 5.46875 22.6562 5.46875H21.815L20.4826 22.1242C20.3526 23.7483 18.9968 25 17.3675 25H7.63249C6.00324 25 4.64737 23.7483 4.51744 22.1242L3.185 5.46875H2.34375C1.91228 5.46875 1.5625 5.11897 1.5625 4.6875C1.5625 4.25603 1.91228 3.90625 2.34375 3.90625H7.8125V2.34375C7.8125 1.04933 8.86183 0 10.1562 0H14.8438C16.1382 0 17.1875 1.04933 17.1875 2.34375ZM9.375 2.34375V3.90625H15.625V2.34375C15.625 1.91228 15.2752 1.5625 14.8438 1.5625H10.1562C9.72478 1.5625 9.375 1.91228 9.375 2.34375ZM7.03123 7.85703L7.81248 21.1383C7.83782 21.569 8.20753 21.8976 8.63826 21.8723C9.06899 21.847 9.39762 21.4773 9.37228 21.0465L8.59103 7.76528C8.5657 7.33455 8.19598 7.00592 7.76526 7.03125C7.33453 7.05659 7.00589 7.4263 7.03123 7.85703ZM17.2347 7.0326C16.804 7.00726 16.4343 7.33589 16.409 7.76662L15.6277 21.0479C15.6024 21.4786 15.931 21.8483 16.3617 21.8736C16.7925 21.899 17.1622 21.5704 17.1875 21.1396L17.9688 7.85838C17.9941 7.42765 17.6655 7.05793 17.2347 7.0326ZM12.5 7.03125C12.0685 7.03125 11.7188 7.38103 11.7188 7.8125V21.0938C11.7188 21.5252 12.0685 21.875 12.5 21.875C12.9315 21.875 13.2813 21.5252 13.2813 21.0938V7.8125C13.2813 7.38103 12.9315 7.03125 12.5 7.03125Z"
										fill="#858585"
									/>
								</svg>
							</Button>
						</div>
					</div>
					<div class="todo-list-task-add-container">
						<div class="todo-list-task-add-input">
							<input
								class="task-input"
								type="text"
								style={{
									fontSize: "20px",
									textAlign: "center",
								}}
								value={todoInput}
								onChange={(e) => setTodoInput(e.target.value)}
								onKeyDown={(e) => {
									e.key === "Enter" ? addTask() : null;
								}}
							/>
						</div>
						<Button
							type="fill"
							style={{ width: "90%" }}
							onClick={addTask}>
							Add Task
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Todo;
