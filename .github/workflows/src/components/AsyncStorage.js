import { Component } from 'react'
import ReactStorage from '@react-native-community/async-storage';

export default class AsyncStorage extends Component {

    static saveData(key = "", value = "") {
        return new Promise((resolve, reject) => {
            ReactStorage.setItem(key, value).then(() => {
                resolve()
            }).catch((error) => {
                reject(error)
            })
        })
    }

    static getData(key = "") {
        return new Promise((resolve, reject) => {
            ReactStorage.getItem(key).then((value) => {
                if (value) {
                    resolve(value)
                } else {
                    resolve('')
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

}
