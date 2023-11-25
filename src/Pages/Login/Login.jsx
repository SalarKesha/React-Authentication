import React, { useEffect, useLayoutEffect } from 'react'
import { useState } from 'react'
import { useAuthDispatch, useAuthState } from '../../Context/auth-context'
import { toast } from 'react-toastify'
import { actionTypes } from '../../Context/reducer'
import { Oval } from 'react-loader-spinner'
import { useRequest } from "../../Requests/requests"
import { useNavigate, useLocation } from 'react-router-dom'
function notify(message, type) {
    toast[type](message)
}
function useLogin() {
    const { get, post } = useRequest()
    const fetchAccessTokenViaUsernameAndPassword = async (username, password) => {
        return await post('api/token/', { email: username, password: password })
            .then(response => [response.data.access, response.data.refresh])
            .catch()
    }
    const fetchAccessTokenViaRefreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token')
        return post('api/token/refresh/', { refresh: refreshToken })
            .then(response => response.data.access)
            .catch()
    }

    const fetchUserInfo = async (userID) => {
        return get(`profile/${userID}/`)
            .then(response => response.data)
            .catch()
    }

    const fetchUserID = async () => {
        return get('profile/id/')
            .then(response => response.data)
            .catch()
    }

    const sendOneTimePassword = async (email) => {
        return post('login/', { email: email })
            .then(response => response.data)
            .catch()
    }
    return {
        fetchAccessTokenViaUsernameAndPassword,
        fetchAccessTokenViaRefreshToken,
        fetchUserInfo,
        sendOneTimePassword,
        fetchUserID
    }
}


export default function Login() {
    const {
        fetchAccessTokenViaUsernameAndPassword,
        fetchAccessTokenViaRefreshToken,
        fetchUserInfo,
        sendOneTimePassword,
        fetchUserID
    } = useLogin()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [access, setAccess] = useState(null)
    const [refresh, setRefresh] = useState(null)
    const authDispatch = useAuthDispatch()
    const { loading } = useAuthState()
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = (e) => {
        e.preventDefault()
        fetchAccessTokenViaUsernameAndPassword(username, password)
            .then(([accessToken, refreshToken]) => {
                setAccess(accessToken)
                setRefresh(refreshToken)
                // navigate(location?.state?.from ? location.state.from : '/')
                // navigate('/')
                notify('Loged in successfully', 'success')
            }).catch(() => notify('Code did not match!', 'error'))
    }

    const handleNextStep = (e) => {
        e.preventDefault()
        sendOneTimePassword(username)
            .then(data => {
                notify('Code sent to Email', 'success')
                setStep(2)
            }).catch(error => notify('This Email does not exist', 'error'))
    }

    const resendCode = (e) => {
        sendOneTimePassword(username)
            .then(data => {
                notify('code sent to email', 'success')
            }).catch(error => notify('error !', 'error'))
    }
    useEffect(() => {
        const fetchData = async () => {
            if (access) {
                localStorage.setItem('access_token', access);
                try {
                    const userID = await fetchUserID().then(data => data.id);
                    const userInfo = await fetchUserInfo(userID);
                    authDispatch({
                        type: actionTypes.LOGIN_SUCCESS,
                        payload: { user: userInfo.id, token: access }
                    });
                    navigate(location?.state?.from ? location.state.from : '/', { replace: true })
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [access, authDispatch]);


    useEffect(() => {
        if (refresh) {
            localStorage.setItem('refresh_token', refresh)
        }
    }, [refresh])

    useLayoutEffect(() => {
        authDispatch({
            type: actionTypes.LOGIN_REQUEST
        })
        fetchAccessTokenViaRefreshToken()
            .then(accessToken => {
                setAccess(accessToken)
                // navigate(location?.state?.from ? location.state.from : '/')
                // navigate('/')

            })
            .catch(error => {
                authDispatch({
                    type: actionTypes.LOGOUT
                })
            })
    }, [authDispatch])

    return (
        <>
            {loading ?
                <Oval
                    visible={true}
                    // height="1"
                    // width="1"
                    // ariaLabel="loader"
                    // wrapperStyle={{}}
                    wrapperClass="spinner-wrapper"
                    colors={['#ebebeb']}
                />
                :
                <div className="login-container">
                    <h2 className="form-title">Login Form</h2>
                    <form action="" className="login-form">
                        {step === 1 &&
                            <>
                                <input value={username} type="email" placeholder="email" onChange={e => setUsername(e.target.value)} />
                                <button className="submit" type="submit" onClick={handleNextStep}>Send code to Email</button>
                            </>
                        }
                        {step === 2 &&
                            <>
                                <input value={password} type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                                <button className="submit" type="submit" onClick={handleLogin}>Login</button>
                                <div className="resend" onClick={resendCode}>Resend the code</div>
                            </>
                        }
                    </form>
                </div>
            }
        </>
    )
}
