import axios from "axios";
import { useAuthDispatch } from "../Context/auth-context"
import { actionTypes } from "../Context/reducer";
import { toast } from 'react-toastify'


function notify(message, type) {
    toast[type](message)
}
export const useRequest = () => {
    const BaseUrl = 'http://127.0.0.1:8000/'
    const authDispatch = useAuthDispatch();
    const get = async (uri) => {
        const url = BaseUrl + uri
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authDispatch({ type: actionTypes.LOGOUT });
                notify('Log in to your account', 'info')
            }
            else if (error.response && error.response.status === 403) {
                notify('Permission denied', 'error')
            }
            else if (error.response && error.response.status === 404) {
                notify('Not found', 'error')
            }
            else if (error.response && error.response.status === 405) {
                notify('Not allowed', 'error')
            }
            else if (error.response && error.response.status === 429) {
                notify('to many requests', 'error')
            }
            else if (error.response && error.response.status === 500) {
                notify('server error', 'error')
            }
            else if (error.message === 'Network Error') {
                notify('Connection error', 'error');
            }
            throw error;
        }
    };

    const post = async (uri, data) => {
        const url = BaseUrl + uri
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                authDispatch({ type: actionTypes.LOGOUT });
                notify('Log in to your account', 'info')
            }
            else if (error.response && error.response.status === 403) {
                notify('Permission denied', 'error')
            }
            else if (error.response && error.response.status === 404) {
                notify('Not found', 'error')
            }
            else if (error.response && error.response.status === 405) {
                notify('Not allowed', 'error')
            }
            else if (error.response && error.response.status === 429) {
                notify('to many requests', 'error')
            }
            else if (error.response && error.response.status === 500) {
                notify('server error', 'error')
            }
            else if (error.message === 'Network Error') {
                notify('Connection error', 'error');
            }
            throw error;
        }
    };
    return { get, post };
};
