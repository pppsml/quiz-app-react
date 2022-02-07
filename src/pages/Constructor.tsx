import React, { useState, useRef, useEffect } from 'react'

import { Input, Button, Select } from '../components'
import { IQuestion, IAnswerOption, IFormControls, IInputControlProps, IQuizData } from '../types';
import { validateInput, checkAllInputsOnValid, createFormControls, generateId } from '../functions';

import { writeQuiz } from '../firebase'

interface renderInputControls {
  inputs: IInputControlProps[],
  title?: string,
}

interface IConstructorState {
  questions: IQuestion[],
  quizName: string,
  currentQuestion : number,
}

const InitialState:IConstructorState = {
  questions: [],
  quizName: '',
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

  const { questions, quizName, currentQuestion } = quiz

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
    quizName: {
      inputs: createFormControls({
        name: 'quizName',
        labelText: `Придумайте название для теста (минимум 10 символов)`,
        // todo рандомизировать примеры названия теста
        placeholder: '(Пример: Имеешь ли ты дальтонизм?)',
        errorMessage: 'Название не может быть пустым',
        autoComplete: 'off',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 10,
        }
      })
    }
	};
	
	const formEl:any = useRef(null);

	const [formIsValid, setFormIsValid] = useState(false)
	const [formErrorMessage, setFormErrorMessage] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(0)

	const [formControls, setFormControls] = useState(InitialFormControls);

  useEffect(() => {
    setFormControls(InitialFormControls)
    setFormErrorMessage('')
    setFormIsValid(false)
    setCorrectAnswer(0)
  }, [currentQuestion, quizName])

  const createQuiz = (event:React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault()
    const confirm = window.confirm('Вы действительно хотите закончить создание теста? Текущий вопрос не добавится. После создания вы будете перенаправлены на страницу со всеми тестами.')
    if (questions.length > 0 && quizName && confirm) {
      const timestamp = Date.now()
      const newQuizData:IQuizData = {
        createdAt: timestamp,
        info: {
          name: quizName,
          questions,
        },
        statistics: {
          numQuestions: questions.length,
          played: 0,
          likes: 0,
        },
        _id: generateId(timestamp, 10)
      }

      writeQuiz(newQuizData)
    }
  }

  const createQuestion = ({text, options, correct}:IQuestion):void => {
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

  const setQuizName = ():void => {
    const quizName = formEl.current.querySelector('input[name="quizName"]').value.trim().replace(/ +/, ' ')

    if (!quizName) {
      const errorMessage = 'Укажите название теста'
			setFormErrorMessage(errorMessage)
			throw console.warn(errorMessage)
    }
    

    if (formIsValid) {
      setQuiz(prev => ({
        ...prev,
        quizName,
      }))
    }
  }



	const createQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		const question:string = formEl.current!.querySelector('input[name="question"]').value.trim();
    const answerOptions:IAnswerOption[] = []

		if (!correctAnswer) {
			const errorMessage = 'Укажите правильный вариант ответа'
			setFormErrorMessage(errorMessage)
			throw console.warn(errorMessage)
		}

    const answerInputs = formEl.current!.querySelectorAll('input[name="answerOpt"]')
    answerInputs.forEach((input:HTMLInputElement, index:number) => {
      answerOptions.push({
        text: input.value,
        id: index + 1,
      })
    })
		
    if (formIsValid) {
      createQuestion({
        text: question,
        options: answerOptions,
        correct: correctAnswer,
      })
    }
	};

	const onInputChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
		controlName: string,
    validityControlNames: string[],
		index: number,
	): void => {
		setFormControls((prev) => {
			const newFormControls = { ...prev };
			const newControls = { ...newFormControls[controlName] };
			const newCurrInputControls = { ...newControls.inputs[index] };

			newCurrInputControls.value = event.target.value;
			newCurrInputControls.touched = true
      const {isValid, errorMessage} = validateInput(newCurrInputControls.value, newCurrInputControls.validation)
			newCurrInputControls.valid = isValid
			newCurrInputControls.errorMessage = errorMessage

			newControls.inputs[index] = newCurrInputControls;
			newFormControls[controlName] = newControls;

      if (formErrorMessage) {
        setFormErrorMessage('')
      }
			setFormIsValid(checkAllInputsOnValid(newFormControls, validityControlNames))

			return newFormControls;
		});
	};

  const onSelectChangeHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setCorrectAnswer(+event.target.value)
  }

  const renderInputs = ( controlName:string, inputControls:renderInputControls, validityControlNames: string[]):React.ReactElement[] => {
    return inputControls.inputs.map((controls, index) => (
      <React.Fragment key={index}>
        {inputControls.title && index === 0 && <p className="text tal">{inputControls.title}</p>}
				<div className='quizConstructor__answerOption' >
					<Input 
						{...controls}
						id={`answerOption-${index + 1}`}
						shouldValidate={!!controls.validation}
						onChange={(event) => onInputChangeHandler(event, controlName, validityControlNames, index)}
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
          {!quizName 

            /* если нет названия теста, выводится окно с инпутом для названия */
            ? <>
              {renderInputs('quizName', formControls['quizName'], ['quizName'])}

              {
                formErrorMessage 
                && <p className='error'>{formErrorMessage}</p>
              }
              
              <div className='buttonContainer endContent'>
                <Button outline onClick={setQuizName} disabled={!formIsValid}>Запомнить название</Button>
              </div>
            </>

            /* после того, как ввел название создаешь вопросы к тесту */
            : <>
              {renderInputs( 'question',formControls['question'], ['question', 'answerOptions'])}
              {renderInputs( 'answerOptions',formControls['answerOptions'], ['question', 'answerOptions'])}

              <Select
                value={correctAnswer}
                onChange={onSelectChangeHandler}
                name='correctAnswer'
                inlineLabel
                labelText='Выберите правильный ответ'
                options={[
                  {text: 'Не выбрано', value: 'asjdhkasd'},
                  {text: '1', value: 1},
                  {text: '2', value: 2},
                  {text: '3', value: 3},
                  {text: '4', value: 4},
                ]}
              />

              {
                formErrorMessage 
                && <p className='error'>{formErrorMessage}</p>
              }

              <div className="buttonContainer endContent">
                <Button title="Текущий вопрос не добавится" type="submit" onClick={createQuiz} disabled={!(questions.length > 0)}>
                  Закончить создание теста
                </Button>
                <Button outline type="submit" onClick={createQuestionClickHandler} disabled={!formIsValid}  >
                  Добавить текущий вопрос
                </Button>
              </div>
            </>
          }

        </form>

      </div>
    </div>
  )
}

export default Constructor