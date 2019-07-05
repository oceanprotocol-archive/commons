import React from 'react'
import { Link } from 'react-router-dom'

const CategoryLink = ({
    category,
    children,
    className,
    ...props
}: {
    category: string
    children?: any
    className?: string
}) => (
    <Link
        to={`/search?categories=${encodeURIComponent(category)}`}
        className={className}
        {...props}
    >
        {children || category}
    </Link>
)

export default CategoryLink
