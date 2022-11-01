import React from 'react';
import { FormInputContainer, InputField, LabelField } from '../Utils/Styles/Global.style';

const FormInput = ({type, label, name, value, handleChange}) => {
  return (
    <FormInputContainer>
        <LabelField 
            htmlFor={name}
        >
            {label}
        </LabelField>
        <InputField 
            type={type} 
            name={name}
            value={value}
            onChange={handleChange}
        />
    </FormInputContainer>
  );
};

export default FormInput;