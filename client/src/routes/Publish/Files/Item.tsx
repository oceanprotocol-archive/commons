import React from 'react'
import styles from './Item.module.scss'
import filesize from 'filesize'

const Item = ({
    item,
    removeItem
}: {
    item: { url: string; found: boolean; type: string; size: number }
    removeItem(): void
}) => (
    <li>
        <a href={item.url}>{item.url}</a>
        <div className={styles.details}>
            <span>url: {item.found ? 'confirmed' : 'unconfirmed'}</span>
            <span>
                size:
                {item.found && item.size ? filesize(item.size) : 'unknown'}
            </span>
            <span>type: {item.found && item.type ? item.type : 'unknown'}</span>
        </div>
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
