import React from 'react'
import Helmet from 'react-helmet'
import Content from '../atoms/Content'
import styles from './Route.module.scss'
import meta from '../../data/meta.json'
import Markdown from '../atoms/Markdown'

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
            {/* Strip HTML from passed title */}
            <title>{title.replace(/(<([^>]+)>)/gi, '')}</title>
            {description && <meta name="description" content={description} />}
        </Helmet>

        <article>
            <header className={styles.header}>
                <Content wide={wide}>
                    <h1 className={styles.title}>{title}</h1>
                    {description && (
                        <Markdown
                            text={description}
                            className={styles.description}
                        />
                    )}
                </Content>
            </header>

            {children}
        </article>
    </div>
)

export default Route
