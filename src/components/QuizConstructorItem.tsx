import React, { useRef } from 'react';
import { useState } from 'react';

import { Button, Input } from './';

import { IAnswerOption, IFormControls, IInputControlProps } from '../types';
import { validateInput } from '../functions';

const createAnswerInputControl = (count: number = 1, label?: string): IInputControlProps[] => {
	const inputControlsArr: IInputControlProps[] = [];

	for (let i = 0; i < count; i++) {
		const labelText = label || `${i + 1}.`;
		inputControlsArr.push({
			value: '',
			type: 'text',
			name: 'answerOpt',
			// labelText,
			valid: false,
			touched: false,
			// inlineLabel: true,
			errorMessage: 'Вариант ответа не может быть пустым',
			validation: {
				required: true,
			},
		});
	}

	return inputControlsArr;
};

interface renderInputControls {
  inputs: IInputControlProps[],
  title?: string,
}

interface QuizConstructorItemProps {
	currentQuestion: number;
	createQuestion: ({}: any) => void;
}



const QuizConstructorItem: React.FC<QuizConstructorItemProps> = ({
	currentQuestion,
	createQuestion,
}) => {
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
					errorMessage: 'Вопрос не может быть пустым',
					valid: false,
					touched: false,
					validation: {
						required: true,
					},
				},
			],
		},
		answerOptions: {
			inputs: createAnswerInputControl(4),
			title: 'Варианты ответов:',
		},
	};

	const [formControls, setFormControls] = useState(InitialFormControls);

	// const incAnswerInputsCountClickHandler = (): void => {
	// 	setAnswersInputsCount((prev) => prev + 1);
	// 	setFormControls((prev) => {
	// 		const newFormControls = { ...prev };
	// 		const newAnswerControls = { ...newFormControls.answerOptions };
	// 		const newAnswerControlInputs = [
	// 			...newAnswerControls.inputs,
	// 			...createAnswerInputControl(1, `${answersInputsCount + 1}.`),
	// 		];

	// 		newAnswerControls.inputs = newAnswerControlInputs;
	// 		newFormControls.answerOptions = newAnswerControls;

	// 		return newFormControls;
	// 	});
	// };

	// const decAnswerInputsCountClickHandler = (): void => {
	// 	if (answersInputsCount - 1 >= minAnswersCount) {
	// 		setAnswersInputsCount((prev) => prev - 1);
	// 		setFormControls((prev) => {
	// 			const newFormControls = { ...prev };
	// 			const newAnswerControls = { ...newFormControls.answerOptions };
	// 			const newAnswerControlInputs = [...newAnswerControls.inputs];
	// 			newAnswerControlInputs.pop();

	// 			newAnswerControls.inputs = newAnswerControlInputs;
	// 			newFormControls.answerOptions = newAnswerControls;

	// 			return newFormControls;
	// 		});
	// 	}
	// };

	const createQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		const question:string = formEl.current!.querySelector('input[name="question"]').value.trim();
		let correct:string = ''
    const answerOptions:IAnswerOption[] = []
		

		const correctAnswerRadios = formEl.current!.querySelectorAll('input[name="correctAnswer"]');
		correctAnswerRadios.forEach((input:HTMLInputElement) => {
			if (input.checked) {
				correct = input.id
			}
		})

    const answerInputs = formEl.current!.querySelectorAll('input[name="answerOpt"]')
    answerInputs.forEach((input:HTMLInputElement, index:number) => {
      answerOptions.push({
        text: input.value,
        id: index + 1,
      })
    })

    createQuestion({
      text: question,
      options: answerOptions,
      correct,
    })
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
			newCurrInputControls.touched = true
			newCurrInputControls.valid = validateInput(newCurrInputControls.value, newCurrInputControls.validation)

			newControls.inputs[index] = newCurrInputControls;
			newFormControls[controlName] = newControls;

			return newFormControls;
		});
	};

  const renderInputs = ( controlName:string, inputControls:renderInputControls ):React.ReactElement[] => {
    return inputControls.inputs.map((controls, index) => (
      <React.Fragment key={index}>
        {inputControls.title && index === 0 && <p className="text tal">{inputControls.title}</p>}
				<div className='quizConstructor__answerOption' >
					{controlName === 'answerOptions' 
					&& <Input 
						type='radio' 
						className='quizConstructor__radioInput' 
						hoverTitle='Отметить как правильный вариант ответа'
						name='correctAnswer'
						shouldValidate={false}
						id={`${index + 1}`}
					/>
					}
					<Input 
						{...controls}
						shouldValidate={!!controls.validation}
						onChange={(event) => onInputChangeHandler(event, controlName, index)}
					/>
				</div>
      </React.Fragment>
    ))
  }


	return (
		<form ref={formEl} id="constructorForm">

      {renderInputs( 'question',formControls['question'])}
      {renderInputs( 'answerOptions',formControls['answerOptions'])}

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
