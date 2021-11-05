import axios from 'axios'
import requestConfig from '../config/requestConfig'

const ajax = axios.create({
    baseURL: requestConfig.baseUrl,
})

export default ajax