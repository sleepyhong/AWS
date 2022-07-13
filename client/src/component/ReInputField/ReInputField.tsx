import React from "react";

interface Input {
    name: string,
    value: string,
    changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ReInputField(props: Input) {
    const name: string = props.name;
    const value: string = props.value;
    const changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void = props.changeInput;

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input id={name} name={name} value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {changeInput(event)}} />
        </div>
    );
}