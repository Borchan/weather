import { makeAutoObservable } from 'mobx'
import { THEME_COLORS, TIME_RANGE } from '@const/globals'
import { TChartType, TTheme } from '@/types/chartOptions'

class ChartOptionsStore {
    type: TChartType = 'line'
    timeRange: string = TIME_RANGE[0].value
    theme: TTheme = 'light'

    constructor() {
        makeAutoObservable(this)
    }
    setTimeRange(range: string) {
        this.timeRange = range
    }
    setTheme(theme: TTheme) {
        this.theme = theme
    }
    setType(type: TChartType) {
        this.type = type
    }
    get themeColors() {
        if (this.theme == 'light') {
            return THEME_COLORS.light
        } else {
            return THEME_COLORS.dark
        }
    }
}

export const chartOptionsStore = new ChartOptionsStore()
