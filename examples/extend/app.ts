import axios from '../../src/index'

// axios({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hi'
//     }
// })

// axios.request({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hello'
//     }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })

// axios({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hi'
//     }
// })

// axios('/extend/post', {
//     method: 'post',
//     data: {
//         msg: 'hello'
//     }
// })
// 定义后段返回的数据格式，axios接受到的就是这样的格式，返回的也是这样的格式
interface ResponseData<T = any> {
    code: number
    result: T  //数据格式中的result的具体格式
    message: string
}

interface User { //result 对应的数据格式
    name: string
    age: number
}

function getUser<T>() {
    return axios<ResponseData<T>>('/extend/user')
        .then(res => res.data)
        .catch(err => console.error(err))
}


async function test() {
    const user = await getUser<User>()
    if (user) {
        console.log(user.result.name)
    }
}

test()

