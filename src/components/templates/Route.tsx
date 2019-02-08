import React from 'react'
import Helmet from 'react-helmet'
import Content from '../Content'
import styles from './Route.module.scss'
import meta from '../../data/meta.json'

const Route = ({
    title,
    wide,
    children,
    className
}: {
    title: string
    children: any
    wide?: boolean
    className?: string
}) => (
    <div className={className}>
        <Helmet defaultTitle={meta.title} titleTemplate={`%s - ${meta.title}`}>
            <title>{title}</title>
        </Helmet>

        <Content wide={wide}>
            <header className={styles.header}>
                <h1>{title}</h1>
            </header>

            {children}
        </Content>
    </div>
)

export default Route
