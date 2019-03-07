import React from 'react'
import styles from './Help.module.scss'

const FormHelp = ({ children }: { children: string }) => (
    <div className={styles.help}>{children}</div>
)

export default FormHelp
