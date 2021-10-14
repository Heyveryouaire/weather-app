
const OPENWEATHER_API_KEY = '0030e3dafd2a39103480097d694818ff'
const OPENWEATHER_PATH = `http://api.openweathermap.org/data/2.5/weather?`
const OPENWEATHER_FORECAST_PATH = `http://api.openweathermap.org/data/2.5/forecast?`

const WEATHER_API_KEY = '4157d50c303843d1bb4141330210405'
const WEATHER_PATH = `http://api.weatherapi.com/v1/search.json?`

function get(path, params) {

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    return new Promise((resolve, reject) => {   
        let query
        if (params) {
            query = Object.keys(params).map(p => {
                return encodeURIComponent(p) + "=" + encodeURIComponent(params[p])
            }).join('&')
        }

        fetch(path + query, {
            signal: controller.signal
        })
            .then(rep => {
                clearTimeout(timeout)
                return rep.json()
            })
            .then(rep => resolve(rep))
            .catch(err => reject(err))
    })
}


const API = {
    getMeteo: (city) => {
        return get(OPENWEATHER_PATH, { q: city, appid: OPENWEATHER_API_KEY, units: 'metric', lang: 'fr' })
    },
    getCities: (city) => {
        return get(WEATHER_PATH, { key: WEATHER_API_KEY, q: city })
    },
    getForecast: (city) => {
        return get(OPENWEATHER_FORECAST_PATH, { q: city, appid: OPENWEATHER_API_KEY, units: 'metric', lang: 'fr' })
    }
}

export default API