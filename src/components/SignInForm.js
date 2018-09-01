import React from 'react';
import { Form, Field } from 'react-final-form';
import Styles from './FormStyles';
import { mapPlayers } from '../initialState';

const required = value => (value ? undefined : 'Required');
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const usernameAlreadyTaken = (value) => {
    const usernames = [];
    mapPlayers.forEach((v) => {
        usernames.push(v.name);
    });
    return usernames.includes(value) ? 'Username already taken!' : undefined;
};


const composeValidators = (...validators) => value =>
            validators.reduce((error, validator) => error || validator(value), undefined);

const SignInForm = ({ onSubmit }) => (
    <Styles data-styled-components="true">
        <Form
            onSubmit={onSubmit}
            initialValues={{ }}
            validate={(values) => {
                const errors = {};
                // if (!values.Username) {
                //  errors.Username = 'Required';
                // }
                if (!values.Password) {
                  errors.Password = 'Required';
                }
                // if (!values.favoriteColor) {
                //    errors.favoriteColor = 'Required';
                // }
                /*
                if (!values.age) {
                  errors.age = 'Required';
                } else if (isNaN(values.age)) {
                  errors.age = "Must be a number";
                } else if (values.age < 18) {
                  errors.age = "No kids allowed";
                }
                */
                return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="Username"
                        validate={composeValidators(required, usernameAlreadyTaken)}
                    >
                        {({ input, meta }) => (
                            <div>
                                <label>Username</label>
                                <input {...input} type="text" placeholder="Username" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="Password">
                        {({ input, meta }) => (
                            <div>
                                <label>Password</label>
                                <input {...input} type="password" placeholder="Password" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <div>
                        <label>Favorite Color</label>
                        <Field name="favoriteColor" component="select">
                            <option />
                            <option value="#ff0000">❤️ Red</option>
                            <option value="#00ff00">💚 Green</option>
                            <option value="#0000ff">💙 Blue</option>
                        </Field>
                    </div>
                    <div className="buttons">
                        <button
                            type="submit"
                            disabled={submitting || pristine}
                        >
                          Submit
                        </button>
                        <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                          Reset
                        </button>
                    </div>
                    
                    {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </form>
            )}
        />
    </Styles>
);

export default SignInForm;
