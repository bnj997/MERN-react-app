import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Authenticate.css';


function Authenticate() {
    const auth = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formState, inputHandler, setFormData ] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }, false)

    function authSubmit(event) {
        event.preventDefault();
        auth.login();
    }

    function switchMode() {
        if (!isLogin) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                }, 
                false
            );
        }
        //basically switches mode by changing to what it was not
        setIsLogin(prevMode => !prevMode)
    };

    return (
        <Card className="authentication">
            <h2>Login Required </h2>
            <hr />
            <form onSubmit={authSubmit}>
                {!isLogin && (
                    <Input 
                        element="input" 
                        id="name" 
                        type="text" 
                        label="Name" 
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                )}
                <Input 
                    id="email" 
                    element="input"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input 
                    id="password" 
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password, at least 5 characters."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLogin ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchMode}>
                SWITCH TO {isLogin ? 'SIGN UP' : 'LOGIN'}
            </Button>
         </Card>
    )
}

export default Authenticate;