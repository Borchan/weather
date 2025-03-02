import { makeAutoObservable, runInAction } from 'mobx'
import { APIID, HOURS_AVERAGE } from '@const/globals'
import { IRoot } from '@/types/weatherAPI'

class WeatherStore {
    weatherData: IRoot[] = []
    daysAverage: number = HOURS_AVERAGE
    error: boolean = false
    loading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }
    //get weather from API OpenWeather
    async fetchWeather(range: string): Promise<void> {
        try {
            this.loading = true
            //fake delay
            new Promise((resolve) => setTimeout(resolve, 2000))

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?id=524901&cnt=${range}&appid=${APIID}`
            )
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            runInAction(() => (this.weatherData = data.list))
        } catch (error) {
            console.error(error)
            runInAction(() => (this.error = true))
        } finally {
            runInAction(() => (this.loading = false))
        }
    }
    get labels(): string[] {
        return this.weatherData.map((weather) => weather.dt_txt)
    }
    get temperature(): number[] {
        return this.weatherData.map((weather) => weather.main.temp - 273.15)
    }
    get temperatureMinimum(): number[] {
        return this.weatherData.map((weather) => weather.main.temp_min - 273.15)
    }
    get humidity(): number[] {
        return this.weatherData.map((weather) => weather.main.humidity)
    }
    //moving average calculation
    get average(): number[] {
        const result = []

        for (let i = 0; i < this.temperature.length; i++) {
            if (i < this.daysAverage - 1) {
                result.push(NaN)
            } else {
                let sum = 0
                for (let j = 0; j < this.daysAverage; j++) {
                    sum += this.temperature[i - j]
                }

                result.push(sum / this.daysAverage)
            }
        }

        return result
    }
}

export const weatherStore = new WeatherStore()
