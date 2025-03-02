import { observer } from 'mobx-react-lite'
import { chartOptionsStore } from '@stores/chartOptionsStore'
import { TIME_RANGE } from '@const/globals'
import {
    Alert,
    Button,
    Flex,
    Radio,
    RadioChangeEvent,
    Select,
    Spin,
} from 'antd'
import { WeatherCharts } from '@components/WeatherCharts'
import s from './weather.module.css'
import { useEffect } from 'react'
import { weatherStore } from '@/stores/weatherStore'

export const WeatherDashboard: React.FC = observer(() => {
    useEffect(() => {
        weatherStore.fetchWeather(chartOptionsStore.timeRange)
    }, [chartOptionsStore.timeRange])

    const handleRangeChange = (value: string) => {
        chartOptionsStore.setTimeRange(value)
    }
    const handleTypeChange = (event: RadioChangeEvent) => {
        chartOptionsStore.setType(event.target.value)
    }

    if (weatherStore.loading)
        return <Spin tip="Loading" size="small" fullscreen></Spin>
    if (weatherStore.error)
        return (
            <Alert
                className={s.alert}
                message="Error"
                description="Data loading error"
                type="error"
                showIcon
            />
        )
    return (
        <section
            className={s.weather}
            style={{
                backgroundColor: chartOptionsStore.themeColors.backgroundColor,
            }}
        >
            <Flex justify="space-between">
                <Flex gap="middle">
                    <Select
                        defaultValue={TIME_RANGE[0].value}
                        className={s.Select}
                        onChange={handleRangeChange}
                        options={TIME_RANGE}
                    />
                    <Button
                        color="default"
                        variant={
                            chartOptionsStore.theme == 'light'
                                ? 'solid'
                                : 'outlined'
                        }
                        onClick={() =>
                            chartOptionsStore.setTheme(
                                chartOptionsStore.theme == 'light'
                                    ? 'dark'
                                    : 'light'
                            )
                        }
                    >
                        {chartOptionsStore.theme.toUpperCase()}
                    </Button>
                </Flex>
                <Radio.Group
                    onChange={handleTypeChange}
                    defaultValue={chartOptionsStore.type}
                >
                    <Radio.Button value="line">Line</Radio.Button>
                    <Radio.Button value="bar">Bar</Radio.Button>
                    <Radio.Button value="average">Average</Radio.Button>
                    <Radio.Button value="combine">Combine</Radio.Button>
                </Radio.Group>
            </Flex>

            <WeatherCharts />
        </section>
    )
})
