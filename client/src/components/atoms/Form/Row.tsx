import React from 'react'
import cx from 'classnames'
import styles from './Row.module.scss'

const Row = ({ children, small }: { children: any; small?: boolean }) => (
    <div className={cx(styles.row, small && styles.small)}>{children}</div>
)

export default Row
