import React from 'react'
import styles from './InputGroup.module.scss'

const InputGroup = ({ children }: { children: any }) => (
    <div className={styles.inputGroup}>{children}</div>
)

export default InputGroup
