import React, { useRef } from 'react';
import { useState } from 'react';

import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { Button, Input } from './';

import { IFormControls, IInputControlProps } from '../types';

const createAnswerInputControl = (count: number = 1, label?: string): IInputControlProps[] => {
	const inputControlsArr: IInputControlProps[] = [];

	for (let i = 0; i < count; i++) {
		const labelText = label || `${i + 1}.`;
		inputControlsArr.push({
			value: '',
			type: 'text',
			name: 'answerOpt',
			labelText,
			valid: false,
			touched: false,
			inlineLabel: true,
			validation: {
				required: true,
			},
		});
	}

	return inputControlsArr;
};

interface QuizConstructorItemProps {
	currentQuestion: number;
	createQuestion: ({}: any) => void;
}

const QuizConstructorItem: React.FC<QuizConstructorItemProps> = ({
	currentQuestion,
	createQuestion,
}) => {
	const minAnswersCount = 3;
	const [answersInputsCount, setAnswersInputsCount] = useState(minAnswersCount);
	const formEl: any = useRef(null);

	const InitialFormControls: IFormControls = {
		question: {
			inputs: [
				{
					value: '',
					type: 'text',
					name: 'question',
					labelText: `Вопрос №${currentQuestion}`,
					placeholder: 'Введите текст вопроса',
					valid: false,
					touched: false,
					validation: {
						required: true,
					},
				},
			],
		},
		answerOptions: {
			inputs: createAnswerInputControl(answersInputsCount),
			title: 'Варианты ответов:',
		},
		correctAnswer: {
			inputs: [
				{
					value: '',
					type: 'number',
					name: 'correctAnswer',
					labelText: `Номер правильного варианта ответа`,
					placeholder: `от 1 до ${answersInputsCount}`,
					valid: false,
					touched: false,
					validation: {
						required: true,
						pattern: `[1-${answersInputsCount}]`,
					},
				},
			],
		},
	};

	const [formControls, setFormControls] = useState(InitialFormControls);

	const incAnswerInputsCountClickHandler = (): void => {
		setAnswersInputsCount((prev) => prev + 1);
		setFormControls((prev) => {
			const newFormControls = { ...prev };
			const newControls = { ...newFormControls.answerOptions };
			const newControlInputs = [
				...newControls.inputs,
				...createAnswerInputControl(1, `${answersInputsCount + 1}.`),
			];

			newControls.inputs = newControlInputs;
			newFormControls.answerOptions = newControls;

			return newFormControls;
		});
	};

	const decAnswerInputsCountClickHandler = (): void => {
		if (answersInputsCount - 1 >= minAnswersCount) {
			setAnswersInputsCount((prev) => prev - 1);
			setFormControls((prev) => {
				const newFormControls = { ...prev };
				const newControls = { ...newFormControls.answerOptions };
				const newControlInputs = [...newControls.inputs];
				newControlInputs.pop();

				newControls.inputs = newControlInputs;
				newFormControls.answerOptions = newControls;

				return newFormControls;
			});
		}
	};

	const createQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const question = formEl.current!.querySelector('input[name="question"]').value.trim();
		const correctAnswer = formEl.current!.querySelector('input[name="correctAnswer"]').value.trim();
		console.log(correctAnswer);
	};

	const onInputChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
		controlName: string,
		index: number,
	): void => {
		setFormControls((prev) => {
			const newFormControls = { ...prev };
			const newControls = { ...newFormControls[controlName] };
			const newCurrInputControls = { ...newControls.inputs[index] };

			newCurrInputControls.value = event.target.value;

			newControls.inputs[index] = newCurrInputControls;
			newFormControls[controlName] = newControls;

			return newFormControls;
		});
	};

	const controlButtons = (
		<div className="buttonContainer centerContent" style={{ marginBottom: '10px' }}>
			<Button circle style={{ width: 40, height: 40 }} onClick={incAnswerInputsCountClickHandler}>
				<IoAddOutline className="icon" />
			</Button>
			<Button
				circle
				style={{ width: 40, height: 40 }}
				onClick={decAnswerInputsCountClickHandler}
				disabled={!(answersInputsCount - 1 >= minAnswersCount)}>
				<IoRemoveOutline className="icon" />
			</Button>
		</div>
	);

	return (
		<form ref={formEl} id="constructorForm">
			{Object.keys(formControls).map((controlName) => {
				if (Array.isArray(formControls[controlName].inputs)) {
					return formControls[controlName].inputs.map((controls: any, index: number) => {
						const key = `${controls.labelText}}`;

						return (
							<React.Fragment key={index}>
								{formControls[controlName].title && index === 0 && (
									<p className="text tal">{formControls[controlName].title}</p>
								)}
								<Input
									key={key}
									{...controls}
									onChange={(event) => onInputChangeHandler(event, controlName, index)}
								/>
								{controlName === 'answerOptions' &&
									index === formControls[controlName].inputs.length - 1 &&
									controlButtons}
							</React.Fragment>
						);
					});
				}
			})}
			<div className="buttonContainer endContent">
				<Button title="Текущий вопрос не добавится" type="submit">
					Закончить создание теста
				</Button>
				<Button outline type="submit" onClick={createQuestionClickHandler}>
					Добавить текущий вопрос
				</Button>
			</div>
		</form>
	);
};

export default QuizConstructorItem;
