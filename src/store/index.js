import {createStore} from 'vuex'
import axios from "axios";


export default createStore({
    state: {
        countries: [],
        isLoading: true,
        countryPayloadArray: null,
        myList: [],

    },
    getters: {
        getCountryBorders: (state) => {
            return state;
        },
        searchResult: (state) => state.countries
    },
    mutations: {
        SET_COUNTRIES(state, countries) {
            state.country = {};
            state.borders = [];
            state.countries = countries;
        },
        SET_COUNTRY(state, country) {
            state.country = country;
            state.borders = [];
        },
        SET_COUNTRY_BORDER(state, borderName) {
            state.borders.push(borderName);
        },
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        },

        SET_CURRENT_COUNTRY(state, payload) {
            state.countryPayloadArray = state.countries.filter(country => {
                return country.ccn3 === payload
            })
        },

        ADD_COUNTRY_TO_MY_LIST(state, payload) {
            if (!state.myList.some(country => country.ccn3 === payload.ccn3)) {
                 state.myList.push(payload)
             }
        },

        ADD_TO_COUNTRIES(state, payload) {
            state.countries.push(payload)
        },

        SEARCH_RESULTS(state, result) {
            state.countries = result;
        },
    },


    actions: {
        getCountries({commit}) {
            axios.get("https://restcountries.com/v3/all")
                .then(response => {
                    commit("SET_COUNTRIES", response.data);
                    if (response.data) {
                        commit("SET_LOADING", false);
                    } else {
                        commit("SET_LOADING", true);
                    }
                });
        },
        async getCountrybyCode({commit, dispatch}, data) {
            if (data.code && data.code.length != 0) {
                const res = await axios.get(`https://restcountries.com/v3.1/alpha/${data.code}`);
                commit("SET_COUNTRY", res.data);
                dispatch("getCountryName", res.data);
            }
        },
        async getCountryName({commit}, data) {
            if (data.borders) {

                for (var borders in data.borders) {
                    const res = await axios.get(`https://restcountries.com/v3.1/name/${data.borders[borders]}`);
                    commit("SET_COUNTRY_BORDER", res.data);
                }
            }
        },
        async getSearchResults({commit}, query) {
            if (query && query.length != 0) {
                const res = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
                commit("SEARCH_RESULTS", res.data);
            } else {
                const res = await axios.get(`https://restcountries.com/v3/all`);
                commit("SEARCH_RESULTS", res.data);
            }
        },
        async getCountriesByRegion({commit}, region) {
            if (region && region.length != 0) {
                const res = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
                commit("SEARCH_RESULTS", res.data);
            } else {
                const res = await axios.get(`https://restcountries.com/v3/all`);
                commit("SEARCH_RESULTS", res.data);
            }
        }
    },
})
