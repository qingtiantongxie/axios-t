import axios, { AxiosTransformer } from '../../src/index'
import { flattenDiagnosticMessageText } from 'typescript'
// import qs from 'qs'

// axios.default.headers.common['test2'] = 123

// axios({
//     url: '/config/post',
//     method: 'post',
//     data: JSON.stringify({ a: 1 }),
//     headers: {
//         test: '321'
//     }
// }).then((res) => {
//     console.log(res.data)
// })

// axios({
//     transformRequest: [(function (data) {
//         return data
//     }), ...(axios.default.transformRequest as AxiosTransformer[])],
//     transformResponse: [...(axios.default.transformResponse as AxiosTransformer[]), function (data) {
//         if (typeof data === 'object') {
//             data.b = 2
//         }
//         return data
//     }],
//     url: '/config/post',
//     method: 'post',
//     data: {
//         a: 1
//     }
// }).then((res) => {
//     console.log(res.data)
// })

const instance = axios.create({
    transformRequest: [(function (data) {
        return JSON.stringify(data)
    }), ...(axios.default.transformRequest as AxiosTransformer[])],
    transformResponse: [...(axios.default.transformResponse as AxiosTransformer[]), function (data) {
        if (typeof data === 'object') {
            data.b = 2
        }
        return data
    }]
})

instance({
    url: '/config/post',
    method: 'post',
    data: {
        a: 1
    }
}).then((res) => {
    console.log(res.data)
})