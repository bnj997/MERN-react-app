import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Authenticate.css';


function Authenticate() {
	const auth = useContext(AuthContext);
	const [isLogin, setIsLogin] = useState(true);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
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

	async function authSubmit(event) {
		event.preventDefault();
		if (isLogin) {
			//use try block so auth.login only runs if no errors
			try {
				const responseData = await sendRequest(
					'http://localhost:5000/api/users/login', 
					'POST', 
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value
					}),
					{
						'Content-Type': 'application/json'
					},
				); 
				auth.login(responseData.user.id);
			} catch (err) {
				//dont put anythiung here since handled by hook
			}
		
		} else {
			try {
				const responseData = await sendRequest('http://localhost:5000/api/users/signup', 
					'POST',  
					JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value 
					}),
					{
						'Content-Type': 'application/json'
					}
			); 
				auth.login(responseData.user.id);
			} catch (err) {
				//dont put anythiung here since handled by hook
			}
		}
	};

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
	<React.Fragment>
		<ErrorModal error={error} onClear={clearError}/>
		<Card className="authentication">
			{isLoading && <LoadingSpinner asOverlay/>}
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
							validators={[VALIDATOR_MINLENGTH(6)]}
							errorText="Please enter a valid password, at least 6 characters."
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
	</React.Fragment>
	)
}

export default Authenticate;