/*
---------- NO COMMENTS? -----------
⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝ 
⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇ 
⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀ 
⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀ 
⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀ 
⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀ 
⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀
*/


import React, { ChangeEvent, FormEvent, useState } from 'react';
import { getStringLength } from '../functions';

export type IValidatorFN = (s:string) => {}

interface IValidation {
  required: boolean;
  validators?: IValidatorFN[];
}

export interface IField {
  value: string;
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string,
  autoComplete?: 'on' | 'off',
  error?: string;
  isValid?: boolean;
  touched?: boolean;
  validation: IValidation;
  setState?: (event: ChangeEvent<HTMLInputElement>) => {};
}

export type ICustomField<T = {}> = IField & T;

export type ICustomFieldsObject<T = {}> = {
  [key: string]: ICustomField & T;
}

export type IForm = {
  fields: ICustomFieldsObject;
  formIsValid: boolean;
  handleSubmit: (onSubmit: Function) => (e: FormEvent) => void;
}

type IOptions = {
  [key: string]: any;
}

const useForm = (initialFields: ICustomFieldsObject): IForm => {
  const form = Object.entries(initialFields).reduce((fields, [name, value]: any[]) => {
    const isString = typeof value === 'string';

    const field = {
      [name]: {
        value: (isString && value) || ((!isString && value.value) || ''),
        type: (!isString && value.type) || 'text',
        error: (!isString && value.error) || null,
        isValid: (!isString && value.isValid) || true,
        validation: (!isString && value.validation),
        touched: false,
        setState: (value: ChangeEvent<HTMLInputElement>) => handleInput(value, name),
        ...(!isString && value),
      },
    };

    return {...fields, ...field};
  }, {});


  const [fields, setState] = useState<ICustomFieldsObject>(form);
  const [formIsValid, setFormValid] = useState<boolean>(false);



  const getFormValidationState = (fields: ICustomFieldsObject): boolean =>
    Object.entries(fields).reduce((isValid: boolean, [_, value]: any) => Boolean(Number(isValid) * Number(value.isValid)), true);


  const fieldValidation = (field: ICustomField, options: IOptions = {}) => {
    const { value, validation } = field;
    const { required, validators } = validation

    let isValid = true, error;

    if (required) {
      isValid = getStringLength(value) > 0
      error = isValid ? '' : 'field is required';
    }

    
    if (validators && Array.isArray(validators)) {
      const results = validators.map(validateFn => {
        if (typeof validateFn === 'string') return validateFn;
        
        const validationResult = validateFn(value || '');
        
        return typeof validationResult === 'string' ? validationResult : '';
      }).filter(message => message !== '');
      
      if (results.length) {
        isValid = false;
        error = results[0];
      }
    }

    return { ...field, isValid, error, ...options };
  };


  const handleInput = (element: ChangeEvent<HTMLInputElement>, name: string) => {
    const input = fields[name];
    const value = element.target.value;

    const field = {
      ...input,
      value,
      touched: true,
      isValid: true,
    };

    const validatedField = fieldValidation(field);

    setState((prevState: ICustomFieldsObject) => {
      const items = {...prevState, [name]: validatedField};

      setFormValid(getFormValidationState(items));
      return items;
    });
  }


  const handleSubmit = (onSubmit: Function) => (e: FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const fieldsArray = Object.entries(fields);
    const values = fieldsArray.reduce(((prev: ICustomFieldsObject, [name, { value }]: any) => ({ ...prev, [name]: value })), {});
    const validatedInputs = fieldsArray.reduce((prev: ICustomFieldsObject, [name, value]: any) => ({ ...prev, [name]: fieldValidation(value, { touched: true }) }), {});

    setFormValid(getFormValidationState(validatedInputs));
    setState(validatedInputs);

    onSubmit({ values });
  }


  return {
    fields,
    formIsValid,
    handleSubmit,
  }
}

export default useForm