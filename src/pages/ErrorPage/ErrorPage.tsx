import { Typography } from 'antd'
import { Link } from 'react-router'
import s from './errorPage.module.css'

type PropTypes = {
    text: string
}

export const ErrorPage: React.FC<PropTypes> = ({ text }) => {
    return (
        <main className={s.error}>
            <section>
                <Typography.Title>{text}</Typography.Title>
                <Link to="/">Return to main</Link>
            </section>
        </main>
    )
}
