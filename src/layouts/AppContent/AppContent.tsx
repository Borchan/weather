import { WeatherDashboard } from '@/components/WeatherDashboard'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import s from './appContent.module.css'
export const AppContent: React.FC = () => {
    return (
        <Content className={s.content}>
            <WeatherDashboard />
        </Content>
    )
}
