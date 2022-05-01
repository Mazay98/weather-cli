import axios from "axios";

interface IWeatherResponse {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

class Weather {
    private url: string = 'https://api.openweathermap.org/data/2.5/weather'

    constructor(private token: string) {
    }

    public async get(city: string): Promise<IWeatherResponse> {
        try {
            const {data} = await axios.get<IWeatherResponse>(this.url, {
                params: {
                    q: city,
                    appid: this.token,
                    units: 'metric',
                    lang: 'ru'
                }
            })
            return data
        } catch (e) {
            throw e
        }
    }
}

export {Weather, IWeatherResponse}