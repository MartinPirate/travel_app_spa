import { create as createAxiosInstance } from 'axios'


const BASE_URL = 'https://restcountries.com/v3/'

const instance = createAxiosInstance({
    baseURL: BASE_URL,
})


export default {
    async fetchCountries() {
        const endpoint = 'all'

        return (await instance.get(endpoint)).data
    },
}
