import React from 'react'
import styles from './Flipcard.module.scss'


const Flipcard = ({
    frontContent,
    backContent,
    ...props
}: {
    frontContent: any,
    backContent: any
}) => {
    return (
        <div className={styles.flipcard} { ...props }>
         <div className={styles.flipcardinner}>
           <div className={styles.flipcardfront}>
             {frontContent}
           </div>
           <div className={styles.flipcardback}>
             {backContent}
           </div>
         </div>
        </div>
    )
}

export default Flipcard
