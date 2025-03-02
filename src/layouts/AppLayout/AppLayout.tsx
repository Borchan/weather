import { Layout } from 'antd'
import React from 'react'
import { AppHeader } from '../AppHeader'
import { AppContent } from '../AppContent'
import { AppFooter } from '../AppFooter'
import s from './appLayout.module.css'

export const AppLayout: React.FC = () => {
    return (
        <Layout className={s.layout}>
            <AppHeader />
            <AppContent />
            <AppFooter />
        </Layout>
    )
}
