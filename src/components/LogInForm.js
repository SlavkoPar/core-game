import React from 'react';
import { Form, Field } from 'react-final-form';
import Styles from './FormStyles';
import { mapPlayers } from '../initialState';

const required = value => (value ? undefined : 'Required');
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const usernameExists = (value) => {
    const usernames = [];
    mapPlayers.forEach((v) => {
        usernames.push(v.name);
    });
    return usernames.includes(value.trim()) ? undefined : 'Username doesn\'t exist!';
};

const composeValidators = (...validators) => value =>
            validators.reduce((error, validator) => error || validator(value), undefined);

const LogInForm = ({ onSubmit }) => (
    <Styles data-styled-components="true">
        <Form
            onSubmit={onSubmit}
            initialValues={{ }}
            validate={(values) => {
                const errors = {};
                if (values.Username === undefined) {
                    return errors;
                }
                const username = values.Username.trim();
                let pwd = '';
                mapPlayers.forEach((v) => {
                    if (v.name === username) {
                        pwd = v.password;
                    }
                });
                if (values.Password !== pwd) {
                   errors.Password = 'Password doesn\'t match';
                }
                return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="Username"
                        validate={composeValidators(required, usernameExists)}
                    >
                        {({ input, meta }) => (
                            <div>
                                {/* <label>Username</label> */}
                                <input {...input} type="text" placeholder="Username" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field
                        name="Password"
                        validate={composeValidators(required)}
                    >
                        {({ input, meta }) => (
                            <div>
                                {/* <label>Password</label> */}
                                <input {...input} type="password" placeholder="Password" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>
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

export default LogInForm;
