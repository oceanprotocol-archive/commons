import React from 'react'
import Helmet from 'react-helmet'
import Content from '../atoms/Content'
import styles from './Route.module.scss'
import meta from '../../data/meta.json'

const Route = ({
    title,
    description,
    wide,
    children,
    className
}: {
    title: string
    description?: string
    children: any
    wide?: boolean
    className?: string
}) => (
    <div className={className}>
        <Helmet defaultTitle={meta.title} titleTemplate={`%s - ${meta.title}`}>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
        </Helmet>

        <Content wide={wide}>
            <header className={styles.header}>
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </header>

            {children}
        </Content>
    </div>
)

export default Route
