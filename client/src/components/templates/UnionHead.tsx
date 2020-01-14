import React, { PureComponent } from 'react'
import Content from '../atoms/Content'
import styles from './Route.module.scss'
import Markdown from '../atoms/Markdown'
// import Seo from '../atoms/Seo'
import Button from '../atoms/Button'
// import CategoryImage from '../atoms/CategoryImage'
import { IUnion } from '../../box'

interface UnionDetail {
    union: IUnion
    followers: number
}

interface RouteProps {
    unionDetail: UnionDetail
    following: boolean
    followUnion: () => void
    isModerator?: boolean
    image?: any
    shareImage?: string
    children: any
    wide?: boolean
    className?: string
}

interface RouteState {
}

export default class Route extends PureComponent<RouteProps, RouteState> {

    public state = {
    }

    public async componentDidMount() {

    }

    public render() {
        const {
            unionDetail,
            following,
            followUnion,
            isModerator,
            image,
            shareImage,
            children,
            wide,
            className
        } = this.props;

        const { union, followers } = unionDetail

        const title = union.legalName.value
        const subtitle = union.slogan.value
        const description = union.description.value
        const industry = union.knowsAbout.value

        const titleSanitized = title.replace(/(<([^>]+)>)/gi, '')
        const subtitleSanitized = subtitle.replace(/(<([^>]+)>)/gi, '')

        return (
            <div className={className}>
                {/*<Seo
                    title={titleSanitized}
                    description={description}
                    shareImage={shareImage}
                />*/}

                <article>
                    <header className={styles.header}>
                        <Content wide={wide}>
                            {image ? (
                                <div className={styles.imageheader}>
                                    {image}
                                    <h1 className={styles.title}>{titleSanitized}</h1>
                                    <h3 className={styles.title}>{subtitleSanitized}</h3>
                                    <h4>{industry}</h4>
                                    <div className={styles.followers}>{followers || 0} followers</div>
                                    {!isModerator ? (
                                        <Button onClick={() => followUnion()} disabled={following} primary>
                                        {!following ? "Follow":"Following"}
                                        </Button>
                                        ):(
                                        <h3>You're a Moderator</h3>
                                        )
                                    }
                                </div>
                            ) : (
                                <div>
                                    <h1 className={styles.title}>{titleSanitized}</h1>
                                    <h3 className={styles.title}>{subtitleSanitized}</h3>
                                    <h4>{industry}</h4>
                                    <div className={styles.followers}>{followers || 0} followers</div>
                                </div>
                            )}
                            {description && (
                                <Markdown
                                    text={description}
                                    className={styles.description}
                                />
                            )}
                        </Content>
                    </header>

                    {children}
                </article>
            </div>
        )
    }
}