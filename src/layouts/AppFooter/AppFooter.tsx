import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import s from './appFooter.module.css'

export const AppFooter: React.FC = () => {
    return (
        <Footer className={s.footer}>
            Charts {new Date().getFullYear()} Test Task
        </Footer>
    )
}
