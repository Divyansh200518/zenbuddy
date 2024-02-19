import React from "react";
import { useState, useRef, useEffect } from "react";

import Button from "./Button";
import "../quiz.css";

const Quiz = () => {
	const [questions, setQuestions] = useState([
		{
			question: "How often do you feel sad ?",
			answers: [
				"I do not feel sad.",
				"I feel sad.",
				"I am sad all the time and I cant snap out of it.",
				"I am so sad and unhappy that I cant stand it.",
			],
		},
		{
			question: "How do you feel about your future ?",
			answers: [
				"I am not particularly discouraged about the future.",
				"I feel discouraged about the future.",
				"I feel I have nothing to look forward to.",
				" I feel the future is hopeless and that things cannot improve.",
			],
		},
		{
			question: "What do you feel about your failure ?",
			answers: [
				"I do not feel like a failure.",
				"I feel I have failed more than the average person.",
				"As I look back on my life, all I can see is a lot of failures.",
				"I feel I am a complete failure as a person.",
			],
		},
		{
			question: "How much are you satisfied with your life ?",
			answers: [
				"I get as much satisfaction out of things as I used to.",
				"I dont enjoy things the way I used to.",
				"I dont get real satisfaction out of anything anymore.",
				"I am dissatisfied or bored with everything.",
			],
		},
		{
			question: "Do you feel guilty about yourself ?",
			answers: [
				"I dont feel particularly guilty.",
				"I feel guilty a good part of the time.",
				"I feel quite guilty most of the time.",
				"I feel guilty all of the time.",
			],
		},
		{
			question: "Do you punish yourself for something ?",
			answers: [
				"I dont feel I am being punished.",
				"I feel I may be punished.",
				"I expect to be punished.",
				"I feel I am being punished.",
			],
		},
		{
			question: "Do you have any dissapointment about something ?",
			answers: [
				"I am disappointed in myself.",
				"I am disgusted with myself.",
				"I hate myself.",
				"I dont feel disappointed in myself.",
			],
		},
		{
			question: "What is your behavoiur nowdays ?",
			answers: [
				"I dont feel I am being punished.",
				"I feel I may be punished.",
				"I expect to be punished.",
				"I feel I am being punished.",
			],
		},
		{
			question: "What are your thoughts about killing yourself ?",
			answers: [
				"I dont have any thoughts of killing myself.",
				"I have thoughts of killing myself, but I would not carry them out.",
				"I would like to kill myself.",
				"I would kill myself if I had the chance.",
			],
		},
		{
			question: "Do you cry for your problems ?",
			answers: [
				"I dont cry any more than usual.",
				"I cry more now than I used to.",
				"I cry all the time now.",
				"I used to be able to cry, but now I cant cry even though I want to.",
			],
		},
		{
			question: "Do you feel irritated by your daily life ?",
			answers: [
				"I am no more irritated by things than I ever was.",
				"I am slightly more irritated now than usual.",
				"I am quite annoyed or irritated a good deal of the time.",
				"I feel irritated all the time.",
			],
		},
		{
			question: "Do you have intrest in your life ?",
			answers: [
				"I have not lost interest in other people.",
				"I am less interested in other people than I used to be.",
				"I have lost most of my interest in other people.",
				"I have lost all of my interest in other people.",
			],
		},
		{
			question: "How is your decision making skill ?",
			answers: [
				"I make decisions about as well as I ever could.",
				"I put off making decisions more than I used to.",
				"I have greater difficulty in making decisions more than I used to.",
				"I cant make decisions at all anymore.",
			],
		},
		{
			question: "What you think about you beauty ?",
			answers: [
				"I dont feel that I look any worse than I used to.",
				"I am worried that I am looking old or unattractive.",
				"I feel there are permanent changes in my appearance that make me look unattractive.",
				"I believe that I look ugly.",
			],
		},
		{
			question: "Do you do effort to do work ?",
			answers: [
				"I can work about as well as before.",
				"It takes an extra effort to get started at doing something.",
				"I have to push myself very hard to do anything.",
				"I cant do any work at all.",
			],
		},
		{
			question: "How is you sleep activity ?",
			answers: [
				"I can sleep as well as usual.",
				"I dont sleep as well as I used to.",
				"I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.",
				"I wake up several hours earlier than I used to and cannot get back to sleep.",
			],
		},
		{
			question: "How is your physical health ?",
			answers: [
				"I dont get more tired than usual.",
				"I get tired more easily than I used to.",
				"I get tired from doing almost anything.",
				"I am too tired to do anything.",
			],
		},
		{
			question: "How is your appetite for each day ?",
			answers: [
				"My appetite is no worse than usual.",
				"My appetite is not as good as it used to be.",
				"My appetite is much worse now.",
				"I have no appetite at all anymore.",
			],
		},
		{
			question: "Is your weight affected ?",
			answers: [
				"I havent lost much weight, if any, lately.",
				"I have lost more than five pounds.",
				"I have lost more than ten pounds.",
				"I have lost more than fifteen pounds.",
			],
		},
		{
			question: "What do you feel about your health ?",
			answers: [
				"I am no more worried about my health than usual.",
				"I am worried about physical problems like aches, pains, upset stomach, or constipation.",
				"I am very worried about physical problems and its hard to think of much else.",
				"I am so worried about my physical problems that I cannot think of anything else.",
			],
		},
	]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userResponse, setUserResponse] = useState({});

	const handleQuestionChange = (direction) => {
		var i = 0;
		if (direction) {
			if (currentQuestionIndex + 1 < questions.length) {
				setCurrentQuestionIndex((prev) => prev + 1);
			}
		} else {
			if (currentQuestionIndex - 1 > 0) {
				setCurrentQuestionIndex((prev) => prev - 1);
			}
		}
	};

	return (
		<div class="quiz-page-quiz-container">
			<div class="quiz-page-question-container">
				<div class="quiz-page-question">
					{questions[currentQuestionIndex].question}
				</div>
			</div>
			<div class="quiz-page-options-container">
				{questions[currentQuestionIndex].answers.map(
					(option, index) => {
						return (
							<Button
								key={index}
								style={{
									borderRadius: "10px",
									width: "100%",
									height: "20%",
									color: "var(--lg)",
								}}
								type="fill">
								{option}
							</Button>
						);
					}
				)}
				{/* <Button
					style={{
						borderRadius: "10px",
						width: "100%",
						height: "20%",
						color: "var(--lg)",
					}}
					type="fill">
					I do not feel sad
				</Button>
				<Button
					style={{
						borderRadius: "10px",
						width: "100%",
						height: "20%",
						color: "var(--lg)",
					}}
					type="fill">
					I feel sad
				</Button>
				<Button
					style={{
						borderRadius: "10px",
						width: "100%",
						height: "20%",
						color: "var(--lg)",
					}}
					type="fill">
					I am sad all the time and I can’t snap out of it
				</Button>
				<Button
					style={{
						borderRadius: "10px",
						width: "100%",
						height: "20%",
						color: "var(--lg)",
					}}
					type="fill">
					I am so sad and unhappy that I can’t stand it
				</Button> */}
			</div>
			<div class="quiz-page-next-previous-container">
				<Button
					onClick={() => {
						handleQuestionChange(false);
					}}
					style={{
						borderRadius: "10px",
						width: "140px",
						height: "100%",
						color: "var(--lg)",
					}}
					type="fill">
					Previous
				</Button>
				<Button
					onClick={() => {
						handleQuestionChange(true);
					}}
					style={{
						borderRadius: "10px",
						width: "140px",
						height: "100%",
						color: "var(--lg)",
					}}
					type="fill">
					Next
				</Button>
				{/* </div> */}
			</div>
		</div>
	);
};

export default Quiz;
