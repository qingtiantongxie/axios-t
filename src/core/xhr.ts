import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { resolve } from 'path'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {

    return new Promise((resolve, reject) => {
        const { url, data = null, method = 'get', headers, responseType, timeout, cancelToken, withCredentials } = config

        const request = new XMLHttpRequest()
        if (withCredentials) {
            request.withCredentials = true
        }
        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }
        request.open(method.toUpperCase(), url!, true)

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) return
            if (request.status === 0) return
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType === 'text' ? request.responseText : request.response
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }

            handleResponse(response)
        }

        request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
        }

        request.ontimeout = function handleTimeout() {
            reject(createError(`timeout of ${timeout}ms of exceeded`, config, 'ECONNABORTED', request))
        }

        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        if (cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort()
                reject(reason)
            })
        }
        request.send(data)

        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(createError(`request failed with status code ${response.status}`, config, null, request, response))
            }
        }
    })

}