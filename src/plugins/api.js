import axios from 'axios'
import store from '@/store'

const getBaseURL = buildType =>
  buildType == 'production'
    ? `http://localhost:3000/`
    : `http://localhost:3000/`

let apiClient = axios.create({
  baseURL: getBaseURL(process.env.NODE_ENV),
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 120000
})

const setHeaderAuthorization = () =>
  (apiClient.defaults.headers.common['Authorization'] = store.state.token)

const handleError = error => {
  console.log(error)
  alert('Ocurrio un error en la conexión')
}

const postRequest = (route, data) => {
  setHeaderAuthorization()
  return apiClient.post(route, data).catch(handleError)
}

export { postRequest }
