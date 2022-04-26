import axios from "axios";

class Weather{
    constructor(token) {
        this.token = token
        this.url = 'https://api.openweathermap.org/data/2.5/weather'
    }

    async get(city){
        try {
              const { data } = await axios.get(this.url, {
                params:{
                    q: city,
                    appid: this.token,
                    units: 'metric',
                    lang: 'ru'
                }
              })
            return data
        }catch (e){
            throw e
        }
    }
}

export {Weather}