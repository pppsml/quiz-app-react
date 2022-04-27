import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'

import { Input, Button, Select, Title } from '../components'
import { IQuestion, IAnswerOption, IQuizData, ICorrectAnswers } from '../types';
import { generateId } from '../functions';

import { useForm } from '../hooks';
import type { ICustomField, ICustomFieldsObject } from '../hooks'

import { writeQuiz } from '../firebase/firebase-quizzes'
import { useNavigate } from 'react-router-dom';

interface IConstructorState {
  questions: IQuestion[],
  quizName: string,
  currentQuestion: number,
}

const InitialState: IConstructorState = {
  questions: [],
  quizName: '',
  currentQuestion: 0,
}

const createAnswerOptionField = (num:number) => {
  return
}

const Constructor: React.FC = () => {
  const [quiz, setQuiz] = useState(InitialState)

  const { questions, quizName, currentQuestion } = quiz

  const InitialFormControls: ICustomFieldsObject = {
    question: {
      value: '',
      label: `Вопрос №${currentQuestion + 1}`,
      placeholder: 'Введите текст вопроса',
      autoComplete: 'off',
      isValid: false,
      touched: false,
      validation: {
        required: true,
      }
    },
    option1: {
      value: '',
      autoComplete: 'off',
      // labelText: `${i + 1}.`,
      // inlineLabel: true,
      isValid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    quizName: {
      value: '',
      label: `Придумайте название для теста`,
      // todo рандомизировать примеры названия теста
      placeholder: '(Пример: На сколько хорошо ты знаешь Winx?)',
      autoComplete: 'off',
      isValid: false,
      touched: false,
      validation: {
        required: true,
      }
    }
  };

  const {fields, formIsValid} =  useForm(InitialFormControls)
  const { quizName: quizNameField, question } = fields


  const formEl: any = useRef(null);
  const navigate = useNavigate()

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [correctAnswers, setCorrectAnswers]: [ICorrectAnswers, Function] = useState({})

  type IQuestionType = 'single' | 'multiple' | undefined
  const [questionType, setQuestionType]: [IQuestionType, Function] = useState(undefined)

  const [formControls, setFormControls] = useState(InitialFormControls);

  useEffect(() => {
    if (!questions[currentQuestion]) {
      // set default constructor state
      setFormControls(InitialFormControls)
      setFormErrorMessage('')
      setCorrectAnswers({})
      setQuestionType('single')
    } else {
      // set constructor state with saved question
      const { correct, type, text, options } = questions[currentQuestion]
      setFormErrorMessage('')
      setCorrectAnswers(correct)
      setQuestionType(type)
      setFormControls({
        ...InitialFormControls,
        question: {
          ...InitialFormControls.question,
          value: text,
          isValid: true,
        },
        // answerOptions: {
        //   ...InitialFormControls.answerOptions,
        //   inputs: InitialFormControls['answerOptions'].inputs.map((inputControls, index) => {
        //     return createFormControls({
        //       ...inputControls,
        //       value: options[index].text,
        //       valid: true,
        //     })[0]
        //   })
        // }
      })
    }
  }, [currentQuestion, quizName])


  // quiz control functions

  const getQuestionData = ():IQuestion | void => {
    if (questionType === 'single' && Object.keys(correctAnswers).length === 0) {
      setFormErrorMessage('Укажите правильный вариант ответа')
      return
    }

    if (questionType === 'multiple' && Object.keys(correctAnswers).length < 2) {
      setFormErrorMessage('Укажите несколько правильных вариантов ответа')
      return
    }

    const question: string = formEl.current!.querySelector('input[name="question"]').value.trim();
    const answerOptions: IAnswerOption[] = []

    const answerInputs = formEl.current!.querySelectorAll('input[name="answerOpt"]')
    answerInputs.forEach((input: HTMLInputElement, index: number) => {
      answerOptions.push({
        text: input.value,
        id: index + 1,
      })
    })

    const questionData: IQuestion = {
      text: question,
      options: answerOptions,
      type: questionType,
      correct: correctAnswers,
    }

    return questionData
  }

  const createQuiz = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const confirm = window.confirm('Вы действительно хотите закончить создание теста?\nТекущий вопрос не добавится.\nПосле создания вы будете перенаправлены на страницу со всеми тестами.')
    if (questions.length > 0 && quizName && confirm) {

      const timestamp = Date.now()
      const newQuizData: IQuizData = {
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

  const addQuestion = ({ text, options, type, correct }: IQuestion): void => {
    if (!formIsValid) {
      setFormErrorMessage('Заполните все поля')
      return
    }

    setQuiz(prev => {
      const { questions, currentQuestion } = prev

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

  const saveQuestion = (newQuestionData: IQuestion):void => {
    if (!formIsValid) {
      setFormErrorMessage('Заполните все поля')
      return
    }

    setQuiz(prev => {
      const { questions, currentQuestion } = prev

      const newQuestions:IQuestion[] = [
        ...questions
      ]

      if (newQuestionData) {
        newQuestions[currentQuestion] = newQuestionData
        return {
          ...prev,
          currentQuestion: questions.length,
          questions: newQuestions,
        }
      }

      return prev
    })
  }

  const setQuizName = (): void => {
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
  const addQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const questionData = getQuestionData()

    if (formIsValid && questionData) {
      addQuestion(questionData)
    }
  };

  const saveQuestionClickHandler = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault();

    const questionData = getQuestionData()

    if (formIsValid && questionData) {
      saveQuestion(questionData)
    }
  }

  const onTypeSelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuestionType(event.target.value)
    setCorrectAnswers({})
  }

  const onCurrentQuestionSelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuiz(prev => ({
      ...prev,
      currentQuestion: +event.target.value,
    }))
  }

  const onCorrectInputChangeHandler = (event?: React.ChangeEvent<HTMLInputElement>): void => {
    // todo переписать
    const correctAnswersInputs = document.querySelectorAll('.input[name="correctAnswer"]:checked')
    const newCorrectAnswers: ICorrectAnswers = {}

    correctAnswersInputs.forEach((input: any) => {
      newCorrectAnswers[input.value] = true
    })

    setCorrectAnswers(newCorrectAnswers)

  }

  return (
    <>
      <Title text='Создание теста' />
      {questions.length > 0
        && <Select
          value={currentQuestion}
          className='quizConstructor__currQuestionSelect'
          onChange={onCurrentQuestionSelectChangeHandler}
          options={[
            ...questions.map(({ text }, index) => ({ text: `${index + 1}. ${text}`, value: index })),
            { text: 'Новый вопрос', value: questions.length }
          ]}
        />}
      <div className="quizConstructor">

        <form 
          onSubmit={event => { event.preventDefault() }} 
          ref={formEl} 
          id="constructorForm"
        >
          {!quizName

            ? <>
              <Input {...quizNameField} onChange={quizNameField.setState} />

              {
                formErrorMessage
                && <p className='formErrorMessage'>{formErrorMessage}</p>
              }

              <div className='buttonContainer endContent'>
                <Button outline onClick={setQuizName} disabled={!formIsValid} >Запомнить название</Button>
              </div>
            </>

            : <>
              <Select
                labelText='Тип вопроса'
                value={questionType}
                onChange={onTypeSelectChangeHandler}
                options={[
                  { value: 'single', text: 'Один правильный ответ' },
                  { value: 'multiple', text: 'Несколько правильных ответов' },
                ]}
              />
              <Input {...question} onChange={question.setState} />

              {
                formErrorMessage
                && <p className='formErrorMessage'>{formErrorMessage}</p>
              }

              <div className="buttonContainer endContent">
                <Button title="Текущий вопрос не добавится" type="button" onClick={createQuiz} disabled={!(questions.length > 0)}>
                  Закончить создание теста
                </Button>
                {
                  questions[currentQuestion] 
                  ? <Button outline type="button" onClick={saveQuestionClickHandler} disabled={!formIsValid}  >
                    Сохранить текущий вопрос
                  </Button>
                  : <Button outline type="button" onClick={addQuestionClickHandler} disabled={!formIsValid}  >
                    Добавить текущий вопрос
                  </Button>
                }
              </div>
            </>
          }

        </form>

      </div>
    </>
  )
}

export default Constructor