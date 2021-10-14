import API from '../api/'

export default function useWeather(){
    return {
        getMeteo : async (city) => {
                const meteo = await API.getMeteo(city)
                return meteo
        },
        getCities : async(text) => {
            const cities = await API.getCities(text)
            return cities
        },
        getForecast : async(text) => {
            const forecast = await API.getForecast(text)
            return forecast
        }
    }

}