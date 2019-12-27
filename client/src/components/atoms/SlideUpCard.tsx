import React from 'react'
import styles from './SlideUpCard.module.scss'


const SlideUpCard = ({
    frontContent,
    backContent,
    ...props
}: {
    frontContent: any,
    backContent: any
}) => {
    return (
        <div className={styles.slideupcard} { ...props }>
         <div className={styles.inner}>
           <div className={styles.front}>
             {frontContent}
           </div>
           <div className={styles.back}>
             {backContent}
           </div>
         </div>
        </div>
    )
}

export default SlideUpCard
