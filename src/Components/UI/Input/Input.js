// Librairies.
import React   from 'react';

// Input.
export default function Input(props) {

    // Variables.
    let inputElement;
    let buttonStyle = {
        borderRadius: '5px', 
        height      : '100%', 
        width       : '100%', 
        border      : 'none', 
        padding     : '15px', 
        fontFamily  : 'Roboto'
    }

    // Switch pour connaître le type d'input.
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
                    id        = {props.id}
                    style     = {buttonStyle}
                    placeholder  = 'Quelles sont les nouvelles du jour ?'
                    autoFocus
                >
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

    // Render.
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label><br />
            {inputElement}
            {(!props.valid && props.touched) && <span>{props.errorMessage}</span>}
        </div>
    );
};