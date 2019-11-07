import React from 'react'
import PropTypes from 'prop-types'
import styles from './Footer.module.scss'

const Footer = ({ detail, children, symbol }: {detail?: any, children?: any, symbol?: string}) => (
    <div className={styles.bondingcurve_module_footer}>
        <div className={styles.bondingcurve_module_footer__left}>
            {symbol && (
                <div className={styles.symbol}>{symbol}</div>
            )
            }
            <div className={styles.data_point_detail}>
                {
                    detail && (
                        <>
                            {
                                detail.title && <div className={styles.data_point_detail__title}>{detail.title}</div>
                            }
                            {
                                detail.sub && <div className={styles.data_point_detail__sub}>{detail.sub}</div>
                            }
                        </>
                    )
                }
            </div>
        </div>

        <div>
            {
                children || null
            }
        </div>
    </div>
)

Footer.propTypes = {
    detail: PropTypes.shape({
        title: PropTypes.string,
        sub: PropTypes.string
    }),
    children: PropTypes.any,
    symbol: PropTypes.string
}

export default Footer
