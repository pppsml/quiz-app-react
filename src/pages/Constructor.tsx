import React, { useState, useRef, useEffect } from 'react'

import { Input, Button } from '../components'
import { IQuestion, IAnswerOption, IFormControls, IInputControlProps } from '../types';
import { validateInput, checkAllInputsOnValid, createFormControls } from '../functions';

interface renderInputControls {
  inputs: IInputControlProps[],
  title?: string,
}

interface IConstructorState {
  questions: IQuestion[],
  name: string,
  currentQuestion : number,
}

const InitialState:IConstructorState = {
  questions: [],
  name: '',
  currentQuestion: 0,
}


const createAnswersFormControls = (count:number = 1):IInputControlProps[] => {
  const controlsArr:IInputControlProps[] = []

  for (let i = 0; i < count; i++) {
    controlsArr.push(...createFormControls({
      value: '',
      name: 'answerOpt',
      errorMessage: 'Вариант ответа не может быть пустым',
      autoComplete: 'off',
      labelText: `${i + 1}.`,
      inlineLabel: true,
      valid: false,
      touched: false,
      checked: false,
      validation: {
        required: true,
      },
    }))
  }

  return controlsArr
}


const Constructor:React.FC = () => {
  const [ quiz, setQuiz ] = useState(InitialState)

  const { questions, name, currentQuestion } = quiz


  const InitialFormControls: IFormControls = {
		question: {
			inputs: createFormControls({
        name: 'question',
        labelText: `Вопрос №${currentQuestion + 1}`,
        placeholder: 'Введите текст вопроса',
        errorMessage: 'Вопрос не может быть пустым',
        autoComplete: 'off',
        valid: false,
        touched: false,
        validation: {
          required: true,
        }
      }, 1)
		},
		answerOptions: {
			inputs: createAnswersFormControls(4),
			title: 'Варианты ответов:',
		},
	};
	
	const formEl:any = useRef(null);

	const [isFormValid, setIsFormValid] = useState(false)
	const [formErrorMessage, setFormErrorMessage] = useState('')

	const [formControls, setFormControls] = useState(InitialFormControls);

  useEffect(() => {
    setFormControls(InitialFormControls)
  }, [currentQuestion])

  const createQuestion = ({text, options, correct}:IQuestion):void => {
    console.log("Вопрос", text)
    console.log("ответы", options)
    console.log("правильный", correct)

    setQuiz(prev => {
      const {questions, currentQuestion} = prev

      const newQuestion = {
        text,
        options,
        correct,
      }
      
      return {
        ...prev,
        currentQuestion: currentQuestion + 1,
        questions: [...questions, newQuestion],
      }
    })
  }


	const createQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		const question:string = formEl.current!.querySelector('input[name="question"]').value.trim();
    const answerOptions:IAnswerOption[] = []
		let correct:number | null = null
		
		const correctAnswerRadios = formEl.current!.querySelectorAll('input[name="correctAnswer"]');
		correctAnswerRadios.forEach((input:HTMLInputElement) => {
			if (input.checked) {
				correct = +input.value
			}
		})

		if (!correct) {
			const errorMessage = 'Укажите правильный вариант ответа'
			setFormErrorMessage(errorMessage)
			throw new Error(errorMessage)
		}

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

			setIsFormValid(checkAllInputsOnValid(newFormControls))

			return newFormControls;
		});
	};

  const renderInputs = ( controlName:string, inputControls:renderInputControls ):React.ReactElement[] => {
    return inputControls.inputs.map((controls, index) => (
      <React.Fragment key={index}>
        {inputControls.title && index === 0 && <p className="text tal">{inputControls.title}</p>}
				<div className='quizConstructor__answerOption' >
					<Input 
						{...controls}
						id={`answerOption-${index + 1}`}
						shouldValidate={!!controls.validation}
						onChange={(event) => onInputChangeHandler(event, controlName, index)}
					/>
				</div>
      </React.Fragment>
    ))
  }


  return (
    <div className='main__content'>
      <h1 className='text title' >Создание теста</h1>
      <div className="quizConstructor">
        
      <form ref={formEl} id="constructorForm">

        {renderInputs( 'question',formControls['question'])}
        {renderInputs( 'answerOptions',formControls['answerOptions'])}

        <select>
          <option value={0}>Не выбрано</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        {
          formErrorMessage 
          && <p className='error'>{formErrorMessage}</p>
        }

        <div className="buttonContainer endContent">
          <Button title="Текущий вопрос не добавится" type="submit">
            Закончить создание теста
          </Button>
          <Button outline type="submit" onClick={createQuestionClickHandler} disabled={!isFormValid}  >
            Добавить текущий вопрос
          </Button>
        </div>
      </form>

      </div>
    </div>
  )
}

export default Constructor


// todo перенести QuizConstructorItem сюда и сделать весь функционал в одном компоненте