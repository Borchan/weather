import React, { useState } from 'react'
import type { FormProps } from 'antd'
import { Button, Typography, Form, Input, Alert } from 'antd'
import { observer } from 'mobx-react-lite'
import { authStore } from '@stores/authStore'
import { TAuthFieldType } from '@/types/auth'
import s from './auth.module.css'

export const Auth: React.FC = observer(() => {
    const [isRegister, setIsRegister] = useState(false)
    const [isError, setIsError] = useState(false)

    const onFinish: FormProps<TAuthFieldType>['onFinish'] = (values) => {
        let result = false
        if (!isRegister) {
            authStore.login(values).then((data) => (result = data))
            setIsError(!result)
        } else {
            authStore.register(values).then((data) => (result = data))
            setIsError(!result)
        }
    }

    const handleRegister = () => {
        setIsRegister(!isRegister)
        setIsError(false)
    }

    return (
        <main className={s.main}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                className={s.form}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Typography.Title className={s.title}>
                    {isRegister ? 'Register' : 'Login'}
                </Typography.Title>
                <Form.Item<TAuthFieldType>
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<TAuthFieldType>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
                {isError &&
                    (!isRegister ? (
                        <Alert
                            message="Invalid name or password"
                            type="error"
                            showIcon
                        />
                    ) : (
                        <Alert
                            message="User already exists"
                            type="error"
                            showIcon
                        />
                    ))}
                <Button type="link" onClick={handleRegister}>
                    {isRegister ? 'Login' : 'Register'}
                </Button>
            </Form>
        </main>
    )
})
