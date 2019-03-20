import React from 'react'
import styles from './Content.module.scss'

const Content = ({ wide, children }: { wide?: boolean; children: any }) => (
    <div className={wide ? styles.wide : styles.content}>{children}</div>
)

export default Content
