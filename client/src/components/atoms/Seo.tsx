import React from 'react'
import Helmet from 'react-helmet'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import meta from '../../data/meta.json'
import imageDefault from '../../img/share.png'

const MetaTags = ({
    title,
    description,
    url,
    image
}: {
    title: string
    description: string
    url: string
    image: string
}) => (
    <Helmet defaultTitle={meta.title} titleTemplate={`%s - ${meta.title}`}>
        <html lang="en" />

        {title && <title>{title}</title>}

        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@oceanprotocol" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Prevent search engine indexing except for live */}
        {window.location.hostname !== 'commons.oceanprotocol.com' && (
            <meta name="robots" content="noindex,nofollow" />
        )}
    </Helmet>
)

interface SeoProps extends RouteComponentProps {
    title?: string
    description?: string
    shareImage?: string
}

const Seo = ({ title, description, shareImage, location }: SeoProps) => {
    title = title || meta.title
    description = description || meta.description
    shareImage = shareImage || meta.url + imageDefault

    const url = meta.url + location.pathname + location.search

    return (
        <MetaTags
            title={title}
            description={description}
            url={url}
            image={shareImage}
        />
    )
}

export default withRouter(Seo)
