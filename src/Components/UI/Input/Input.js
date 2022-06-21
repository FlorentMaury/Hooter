// Librairies
import React   from 'react';

export default function Input(props) {

    let inputElement;

    // if(!props.valid && props.touched) {
    //     inputClasses.push(classes.invalid);
    // }

    switch (props.type) {
        case('input'):
            inputElement = (
                <input 
                    {...props.config} 
                    value     = {props.value} 
                    id        = {props.id}
                    onChange  = {props.changed}
                    style     = {props.style}
                />
            );
            break;

        case('textarea'):
            inputElement = (
                <textarea 
                    value     = {props.value} 
                    onChange  = {props.changed}
                    id        = {props.id}>
                </textarea>
            );
        break;

        case('select'):
            inputElement = (
                <select 
                    value     = {props.value} 
                    onChange  = {props.changed}
                    id        = {props.id}
                >
                    {props.config.options.map(option => (
                        <option 
                            key={option.value} 
                            value={option.value}
                        >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
        break;

        default:
            break;
    }

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            {inputElement}
            {(!props.valid && props.touched) && <span>{props.errorMessage}</span>}
        </div>
    );
};