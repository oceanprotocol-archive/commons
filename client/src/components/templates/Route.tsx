import React from 'react'
import Helmet from 'react-helmet'
import Content from '../atoms/Content'
import styles from './Route.module.scss'
import meta from '../../data/meta.json'

const Route = ({
    title,
    description,
    titleReverse,
    wide,
    children,
    className
}: {
    title: string
    description?: string
    titleReverse?: boolean
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
            <article>
                <header className={styles.header}>
                    <h1
                        className={
                            titleReverse ? styles.titleReverse : styles.title
                        }
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                    {description && (
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={{
                                __html: description
                            }}
                        />
                    )}
                </header>

                {children}
            </article>
        </Content>
    </div>
)

export default Route
