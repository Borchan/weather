import { authStore } from '@/stores/authStore'
import { LogoutOutlined, SunOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title'
import { observer } from 'mobx-react-lite'
import React from 'react'
import s from './appHeader.module.css'

export const AppHeader: React.FC = observer(() => {
    const handleLogout = () => {
        authStore.logout()
    }
    return (
        <Header className={s.header}>
            <Title style={{ color: '#f5f5f5' }}>
                <SunOutlined /> Weather Dashboard
            </Title>
            <Flex className={s.user}>
                <Flex className={s.paragraph}>
                    Welcome, {authStore.user?.username.toLocaleUpperCase()}
                    <Avatar icon={<UserOutlined />} />
                </Flex>
                <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                    Log Out
                </Button>
            </Flex>
        </Header>
    )
})
