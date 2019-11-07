import React from 'react'
import PropTypes from 'prop-types'
import styles from './Error.module.scss'

const ErrorComponent = ({ message, height }: {message?: string, height?: number}) => (
    <div className={styles.error_component} style={{ minHeight: height || 200 }}>
        <div className={styles.error_component__message}>{message || 'An error has occured'}</div>
    </div>
)

ErrorComponent.propTypes = {
    message: PropTypes.string,
    height: PropTypes.number
}

export default ErrorComponent
