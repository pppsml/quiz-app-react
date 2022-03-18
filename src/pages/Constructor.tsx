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
  currentQuestion: number,
}

const InitialState: IConstructorState = {
  questions: [],
  quizName: '',
  currentQuestion: 0,
}


const createAnswersFormControls = (count: number = 1, values: string[] = []): IInputControlProps[] => {
  const controlsArr: IInputControlProps[] = []

  for (let i = 0; i < count; i++) {
    controlsArr.push(...createFormControls({
      value: values[i] || '',
      name: 'answerOpt',
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


const Constructor: React.FC = () => {
  const [quiz, setQuiz] = useState(InitialState)

  const { questions, quizName, currentQuestion } = quiz

  const InitialFormControls: IFormControls = {
    question: {
      inputs: createFormControls({
        name: 'question',
        labelText: `Вопрос №${currentQuestion + 1}`,
        placeholder: 'Введите текст вопроса',
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
        labelText: `Придумайте название для теста`,
        // todo рандомизировать примеры названия теста
        placeholder: '(Пример: Имеешь ли ты дальтонизм?)',
        autoComplete: 'off',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 8,
        }
      })
    }
  };

  const formEl: any = useRef(null);
  const navigate = useNavigate()

  const [formIsValid, setFormIsValid] = useState(false)
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
      setFormIsValid(false)
      setCorrectAnswers({})
      setQuestionType('single')
    } else {
      // set constructor state with saved question
      const { correct, type, text, options } = questions[currentQuestion]
      setFormErrorMessage('')
      setFormIsValid(true)
      setCorrectAnswers(correct)
      setQuestionType(type)
      setFormControls({
        question: {
          ...InitialFormControls.question,
          inputs: InitialFormControls['question'].inputs.map(inputControls => {
            return createFormControls({
              ...inputControls,
              value: text,
              valid: true,
            })[0]
          })
        },
        answerOptions: {
          ...InitialFormControls.question,
          inputs: InitialFormControls['answerOptions'].inputs.map((inputControls, index) => {
            return createFormControls({
              ...inputControls,
              value: options[index].text,
              valid: true,
            })[0]
          })
        }
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
      const { isValid, errorMessage } = validateInput(newCurrInputControls.value, newCurrInputControls.validation)
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

  const onTypeSelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuestionType(event.target.value)
  }

  const onCurrentQuestionSelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuiz(prev => ({
      ...prev,
      currentQuestion: +event.target.value,
    }))
  }

  const onCorrectInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const correctAnswersInputs = document.querySelectorAll('.input[name="correctAnswer"]:checked')
    const newCorrectAnswers: ICorrectAnswers = {}

    correctAnswersInputs.forEach((input: any) => {
      newCorrectAnswers[input.value] = true
    })

    setCorrectAnswers(newCorrectAnswers)
  }



  const renderInputs = (controlName: string, inputControls: renderInputControls, controlsForValidate: string[]): React.ReactElement[] => {
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

        <form onSubmit={event => { event.preventDefault() }} ref={formEl} id="constructorForm">
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
                  { value: 'single', text: 'Один правильный ответ' },
                  { value: 'multiple', text: 'Несколько правильных ответов' },
                ]}
              />
              {renderInputs('question', formControls['question'], ['question', 'answerOptions'])}
              {renderInputs('answerOptions', formControls['answerOptions'], ['question', 'answerOptions'])}

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
    </div>
  )
}

export default Constructor