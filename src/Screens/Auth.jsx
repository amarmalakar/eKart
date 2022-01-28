import { useState } from "react";
import Input from '../Components/UI/Input';
import Heading from '../Components/UI/Heading';
import Paragraph from '../Components/UI/Paragraph';

import firebase from "../firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthActions } from "../Store/auth-slice";

const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isActionLoading, setIsActionLoading] = useState(false)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }
    
    const formUiHandler = () => setIsLoginForm(isLoginForm ? false : true);

    const authFormHandler = (e, action) => {
        e.preventDefault();
        action === 'login' ? loginHandler() : signupHandler();
    }

    const authentication = getAuth()

    const loginHandler = async () => {
        setIsActionLoading(true)
        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                navigate('/');
                const refreshToken = response._tokenResponse.refreshToken;
                const userId = response.user.uid;
                setIsActionLoading(false)
                clearInputs()
                dispatch(AuthActions.authActiveHandler({ refreshToken, userId }))
            })
            .catch((error) => {
                alert(error.code);
                setIsActionLoading(false)
            })
    }

    const signupHandler = async () => {
        setIsActionLoading(true)
        createUserWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                alert("You're SignUp!")
                setIsLoginForm(true)
                setIsActionLoading(false)
                clearInputs()
            })
            .catch((error) => {
                alert(error.code);
                setIsActionLoading(false)
            })  
    }

    return (
        <div className="middle--form--wrapper">
            <div className="middle--form">
                <Heading label={2} className="bold pColor">
                    {isLoginForm ? 'Login' : 'SignUp'}
                </Heading>

                <form onSubmit={(e) => {authFormHandler(e, isLoginForm ? 'login' : 'signup')}}>
                    <Input
                        label="Email:"
                        input={{
                            type: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "Enter Email..."
                        }}
                    />
                    <Input
                        label="Password:"
                        input={{
                            type: "password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: "Enter Password..."
                        }}
                    />
                    <div className="button-right">
                        <Input
                            input={{
                                type: "submit",
                                value: `${isLoginForm ? 'Login' : 'SignUp'} ${isActionLoading ? '...' : ''}` ,
                                disabled: isActionLoading ? true : false,
                            }}
                        />
                    </div>
                </form>

                <hr />
                {isLoginForm ?
                    <Paragraph className="center pColor">
                        <span className="handler_text" onClick={formUiHandler}>Create An Account</span>
                    </Paragraph>
                :
                    <Paragraph className="center pColor">
                        <span className="handler_text" onClick={formUiHandler}>Already Have Account? Login</span>
                    </Paragraph>
                }
            </div>
        </div>
    )
}

export default Auth;
