import React, { useState, useRef, useEffect } from 'react'

import { Input, Button, Select } from '../components'
import { IQuestion, IAnswerOption, IFormControls, IInputControlProps, IQuizData, ICorrectAnswers } from '../types';
import { validateInput, checkAllInputsOnValid, createFormControls, generateId } from '../functions';

import { writeQuiz } from '../firebase'
import { useNavigate } from 'react-router-dom';

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
      // labelText: `${i + 1}.`,
      // inlineLabel: true,
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
  const navigate = useNavigate()

	const [formIsValid, setFormIsValid] = useState(false)
	const [formErrorMessage, setFormErrorMessage] = useState('')
  const [correctAnswers, setCorrectAnswers]:[ICorrectAnswers, Function] = useState({})

  type IQuestionType = 'single' | 'multiple' | undefined
  const [questionType, setQuestionType]:[IQuestionType, Function] = useState(undefined)

	const [formControls, setFormControls] = useState(InitialFormControls);

  useEffect(() => {
    setFormControls(InitialFormControls)
    setFormErrorMessage('')
    setFormIsValid(false)
    setCorrectAnswers({})
    setQuestionType('single')
  }, [currentQuestion, quizName])


  // quiz control functions

  const createQuiz = (event:React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault()
    const confirm = window.confirm('Вы действительно хотите закончить создание теста?\nТекущий вопрос не добавится.\nПосле создания вы будете перенаправлены на страницу со всеми тестами.')
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
      const timeout = setTimeout(() => {
        navigate('/')
        clearTimeout(timeout)
      }, .5e3)
    }
  }

  const addQuestion = ({text, options, type, correct}:IQuestion):void => {
    if (!formIsValid) {
      setFormErrorMessage('Заполните все поля')
      return
    }

    setQuiz(prev => {
      const {questions, currentQuestion} = prev

      const newQuestion = {
        text,
        options,
        type,
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
			setFormErrorMessage('Укажите название теста')
      return
    }
    

    if (formIsValid) {
      setQuiz(prev => ({
        ...prev,
        quizName,
      }))
    }
  }


  // event handlers
	const addQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();

    if (questionType === 'single' && Object.keys(correctAnswers).length === 0) {
      setFormErrorMessage('Укажите правильный вариант ответа')
      return
    }

    if (questionType === 'multiple' && Object.keys(correctAnswers).length < 2) {
      setFormErrorMessage('Укажите несколько правильных вариантов ответа')
      return
    }

		const question:string = formEl.current!.querySelector('input[name="question"]').value.trim();
    const answerOptions:IAnswerOption[] = []

    const answerInputs = formEl.current!.querySelectorAll('input[name="answerOpt"]')
    answerInputs.forEach((input:HTMLInputElement, index:number) => {
      answerOptions.push({
        text: input.value,
        id: index + 1,
      })
    })
		
    if (formIsValid) {
      addQuestion({
        text: question,
        options: answerOptions,
        type: questionType,
        correct: correctAnswers,
      })
    }
	};

	const onInputChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>,
		controlName: string,
    controlsForValidate: string[],
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
			setFormIsValid(checkAllInputsOnValid(newFormControls, controlsForValidate))

			return newFormControls;
		});
	};

  const onTypeSelectChangeHandler = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(event.target.value)
  }

  const onCorrectInputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const correctAnswersInputs = document.querySelectorAll('.input[name="correctAnswer"]:checked')
    const newCorrectAnswers:ICorrectAnswers = {}

    correctAnswersInputs.forEach((input:any) => {
      newCorrectAnswers[input.value] = true
    })

    setCorrectAnswers(newCorrectAnswers)
  }



  const renderInputs = ( controlName:string, inputControls:renderInputControls, controlsForValidate: string[]):React.ReactElement[] => {
    return inputControls.inputs.map((controls, index) => (
      <React.Fragment key={index}>
        {inputControls.title && index === 0 && <p className="text tal">{inputControls.title}</p>}
				<div className='quizConstructor__answerOption' >
          {
            controlName === 'answerOptions'
            && <Input 
              checked={correctAnswers[index + 1] || false}
              type={questionType === 'multiple' ? 'checkbox' : 'radio'} 
              className='quizConstructor__radioInput' 
              name='correctAnswer' 
              onChange={onCorrectInputChangeHandler}
              value={`${index + 1}`}
            />
          }

					<Input 
						{...controls}
						id={`answerOption-${index + 1}`}
						shouldValidate={!!controls.validation}
						onChange={(event) => onInputChangeHandler(event, controlName, controlsForValidate, index)}
					/>
				</div>
      </React.Fragment>
    ))
  }

  return (
    <div className='main__content'>
      <h1 className='text title' >Создание теста</h1>
      <div className="quizConstructor">

        <form onSubmit={event => {event.preventDefault()}} ref={formEl} id="constructorForm">
          {!quizName 

            /* если нет названия теста, выводится окно с инпутом для названия */
            ? <>
              {renderInputs('quizName', formControls['quizName'], ['quizName'])}

              {
                formErrorMessage 
                && <p className='formErrorMessage'>{formErrorMessage}</p>
              }
              
              <div className='buttonContainer endContent'>
                <Button outline onClick={setQuizName} disabled={!formIsValid} >Запомнить название</Button>
              </div>
            </>

            /* после того, как ввел название создаешь вопросы к тесту */
            : <>
              <Select
                labelText='Тип вопроса'
                value={questionType}
                onChange={onTypeSelectChangeHandler}
                options={[
                  {value: 'single',text: 'Один правильный ответ'},
                  {value: 'multiple',text: 'Несколько правильных ответов'},
                ]} 
              />
              {renderInputs( 'question',formControls['question'], ['question', 'answerOptions'])}
              {renderInputs( 'answerOptions',formControls['answerOptions'], ['question', 'answerOptions'])}

              {
                formErrorMessage 
                && <p className='formErrorMessage'>{formErrorMessage}</p>
              }

              <div className="buttonContainer endContent">
                <Button title="Текущий вопрос не добавится" type="button" onClick={createQuiz} disabled={!(questions.length > 0)}>
                  Закончить создание теста
                </Button>
                <Button outline type="button" onClick={addQuestionClickHandler} disabled={!formIsValid}  >
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