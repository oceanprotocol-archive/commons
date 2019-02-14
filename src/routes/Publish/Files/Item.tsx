import React from 'react'
import styles from './Item.module.scss'

const Item = ({ item, removeItem }: { item: any; removeItem: any }) => (
    <li>
        <a href={item.url}>{item.url}</a>
        <button
            type="button"
            className={styles.remove}
            title="Remove item"
            onClick={removeItem}
        >
            &times;
        </button>
    </li>
)

export default Item
