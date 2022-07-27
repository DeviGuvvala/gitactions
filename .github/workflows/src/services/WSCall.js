
import axios from 'axios';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { NativeModules } from 'react-native';

import authAxios from './authAxios';
import NetworkUtils from './NetworkUtils';
import constants from "./AppConstants";
var Aes = NativeModules.Aes

const axiosInstance = axios.create({
    baseURL: constants.baseurl,
    timeout: 50000,

});
export default class WSCall extends Component {

    static async getResponse(apiName = PropTypes.string, params = PropTypes.object, headers, requestType = 'get', completion = PropTypes.func, progressData = PropTypes.func) {
        let apiAxios = axiosInstance[requestType]
        console.log("baseurl====>",apiAxios)


        if (requestType === 'post') {
            apiAxios = axiosInstance.post
        }

        const isConnected = await NetworkUtils.isNetworkAvailable()

        if (isConnected) {
            try {

                if (requestType === 'post') {
                    console.log("requestType======>",requestType)
                    let objValues = [];
                    let objKeys = [];
                    if (params) {
                        objValues = Object.values(params)
                        objKeys = Object.keys(params)
                    }
                    console.log("Base url======>",apiName,params,headers)
                    const response = await apiAxios(apiName, params, {
                        headers
                    })
                    completion(response.data, null)
                } else if (requestType === 'put') {
                    console.log(axiosInstance.defaults.baseURL, apiName, params, 'put')
                    const response = await apiAxios(apiName, params, headers)
                    console.log('responseeee', response.data)
                    completion(response.data, null)
                } else {
                    console.log(axiosInstance.defaults.baseURL, apiName, params, 'get')
                    const response = await apiAxios(apiName, {
                        params,
                        headers: headers
                    })
                    completion(response.data, null)
                }
            } catch (error) {
                console.log("WSError===>", error.message)
                if (completion) {
                    completion(null, error)
                }
            }
        } else {
            // console.log("Network Error===> Network not available.")
            if (completion) {
                // completion(null, { name: strings.networkErrorTitle, message: strings.networkErrorMsg })
            }
            // Alert.simpLeAlert('', strings.networkErrorMsg)
        }
    }
}
