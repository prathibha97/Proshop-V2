import api from '../../utils/api'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST,
    USER_LIST_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants"

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { PRODUCT_LIST_RESET } from '../constants/productConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        const { data } = await api.post('/users/login', { email, password })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL, payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })
        const { data } = await api.post('/users', { name, email, password })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL, payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await api.get(`/users/${id}`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL, payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await api.put(`/users/profile`, user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL, payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: PRODUCT_LIST_RESET })
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await api.get(`/users`, config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_LIST_FAIL, payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}