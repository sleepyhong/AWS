import React from "react";

interface Input {
    name: string,
    value: string,
    changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    disabled: boolean
}

export default function ReInputField(props: Input) {
    const name: string = props.name;
    const value: string = props.value;
    const changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void = props.changeInput;

    return (
        <div className="form-group">
            <label htmlFor={name}>{name}</label>
            <input
                className="form-control"
                id={name}
                name={name}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { changeInput(event) }}
                type={
                    {
                        "profile_picture": "file",
                        "name": "text",
                        "email": "email",
                        "phone_number": "tel"
                    }[name]
                }
                disabled={props.disabled}
            />
        </div>
    );
}