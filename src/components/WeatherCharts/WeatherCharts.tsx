import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ChartOptions,
} from 'chart.js'
import { observer } from 'mobx-react-lite'
import { Bar, Line } from 'react-chartjs-2'
import { weatherStore } from '@stores/weatherStore'
import { chartOptionsStore } from '@stores/chartOptionsStore'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const WeatherCharts: React.FC = observer(() => {
    const themeColors = chartOptionsStore.themeColors

    const options: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: themeColors.textColor,
                },
            },
            title: {
                display: true,
                color: themeColors.textColor,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: themeColors.backgroundColor,
                titleColor: themeColors.textColor,
                bodyColor: themeColors.textColor,
            },
        },
        scales: {
            x: {
                grid: {
                    color: themeColors.gridColor,
                },
                ticks: {
                    color: themeColors.textColor,
                },
            },
            y: {
                grid: {
                    color: themeColors.gridColor,
                },
                ticks: {
                    color: themeColors.textColor,
                },
            },
        },
    }

    const optionsCombined: ChartOptions<'line'> = {
        ...options,
        scales: {
            x: {
                grid: {
                    color: themeColors.gridColor,
                },
                ticks: {
                    color: themeColors.textColor,
                },
            },
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: themeColors.temperatureColor,
                },
                grid: {
                    color: themeColors.gridColor,
                },
                ticks: {
                    color: themeColors.textColor,
                },
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Humidity (°C)',
                    color: themeColors.humidityColor,
                },
                grid: {
                    color: themeColors.gridColor,
                },
                ticks: {
                    color: themeColors.textColor,
                },
            },
        },
    }

    const data = {
        labels: weatherStore.labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherStore.temperature,
                borderColor: themeColors.temperatureColor,
                backgroundColor: 'transparent',
                tension: 0.3,
            },
        ],
    }

    const dataBar = {
        labels: weatherStore.labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherStore.temperature,
                borderColor: themeColors.temperatureColor,
                backgroundColor: themeColors.temperatureColor,
            },
            {
                label: 'Temperature Minimum (°C)',
                data: weatherStore.temperatureMinimum,
                borderColor: themeColors.temperatureColor,
                backgroundColor: themeColors.humidityColor,
                tension: 0.3,
            },
        ],
    }
    const dataCombined = {
        labels: weatherStore.labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherStore.temperature,
                borderColor: themeColors.temperatureColor,
                backgroundColor: 'transparent',
                tension: 0.3,
                yAxisID: 'y',
            },
            {
                label: 'Humidity (%)',
                data: weatherStore.humidity,
                borderColor: themeColors.humidityColor,
                backgroundColor: 'transparent',
                tension: 0.3,
                yAxisID: 'y1',
            },
        ],
    }

    const dataAverage = {
        labels: weatherStore.labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherStore.temperature,
                borderColor: themeColors.temperatureColor,
                backgroundColor: 'transparent',
                tension: 0.3,
            },
            {
                label: 'Average 9 Hours(°C)',
                data: weatherStore.average,
                borderColor: themeColors.humidityColor,
                backgroundColor: 'transparent',
                tension: 0.3,
            },
        ],
    }

    switch (chartOptionsStore.type) {
        case 'line':
            return <Line options={options} data={data} />
        case 'bar':
            return <Bar options={options} data={dataBar} />
        case 'combine':
            return <Line options={optionsCombined} data={dataCombined} />
        case 'average':
            return <Line options={options} data={dataAverage} />

        default:
            return <Line options={options} data={data} />
    }
})
