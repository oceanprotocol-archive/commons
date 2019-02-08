import React from 'react'
import Helmet from 'react-helmet'
import Content from '../components/Content'
import styles from './Page.module.scss'
import meta from '../data/meta.json'

const Page = ({
    title,
    wide,
    children
}: {
    title: string
    children: any
    wide?: boolean
}) => (
    <>
        <Helmet defaultTitle={meta.title} titleTemplate={`%s - ${meta.title}`}>
            <title>{title}</title>
        </Helmet>

        <Content wide={wide}>
            <header className={styles.header}>
                <h1>{title}</h1>
            </header>

            {children}
        </Content>
    </>
)

export default Page
