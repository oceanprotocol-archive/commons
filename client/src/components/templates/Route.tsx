import React, { PureComponent } from 'react'
import Content from '../atoms/Content'
import styles from './Route.module.scss'
import Markdown from '../atoms/Markdown'
import Seo from '../atoms/Seo'
import Button from '../atoms/Button'
import CategoryImage from '../atoms/CategoryImage'

interface RouteProps {
    title: string
    description?: string
    image?: any
    isSpace?: boolean
    spaceId?: string
    shareImage?: string
    children: any
    wide?: boolean
    className?: string
}

interface RouteState {
    following: boolean
    followers: number
}

export default class Route extends PureComponent<RouteProps, RouteState> {

    public state = {
        following: false,
        followers: 0
    }

    public async componentDidMount() {

        const { spaceId } = this.props
        console.log('3box space', spaceId ? spaceId:'NO')
        this.setState({following: false, followers: 100})
    }

    private followThread = async () => {
        console.log('TODO: Register following on 3box space thread')
    }

    public render() {
        const {
            title,
            description,
            image,
            isSpace,
            shareImage,
            wide,
            children,
            className
        } = this.props;

        const titleSanitized = title.replace(/(<([^>]+)>)/gi, '')

        const { following, followers } = this.state

        return (
            <div className={className}>
                <Seo
                    title={titleSanitized}
                    description={description}
                    shareImage={shareImage}
                />

                <article>
                    <header className={styles.header}>
                        <Content wide={wide}>
                            {image && isSpace ? (
                                <div className={styles.imageheader}>
                                {image}
                                    <h1 className={styles.title}>{titleSanitized}</h1>
                                    <div className={styles.followers}>{followers} followers</div>
                                    <Button onClick={() => this.followThread()} disabled={following} primary>
                                    {following == false ? "Follow":"Following"}
                                    </Button>
                                </div>
                            ) : (
                                <h1 className={styles.title}>{titleSanitized}</h1>
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

// const Route = ({
//     title,
//     description,
//     image,
//     isSpace,
//     shareImage,
//     wide,
//     children,
//     className
// }: RouteProps) => {
//     // Strip HTML from passed title
//     const titleSanitized = title.replace(/(<([^>]+)>)/gi, '')

//     const following = false
//     const followers = 100

//     return (
//         <div className={className}>
//             <Seo
//                 title={titleSanitized}
//                 description={description}
//                 shareImage={shareImage}
//             />

//             <article>
//                 <header className={styles.header}>
//                     <Content wide={wide}>
//                         <h1 className={styles.title}>{titleSanitized}</h1>

//                         {image && image}

//                         {isSpace && (
//                             <Content>
//                                 <Button onClick={() => followThread()} disabled={following} primary>
//                                 {following == false ? "Follow":"Following"}
//                                 </Button>
//                                 <div className={styles.followers}>{followers} followers</div>
//                             </Content>
//                         )}

//                         {description && (
//                             <Markdown
//                                 text={description}
//                                 className={styles.description}
//                             />
//                         )}
//                     </Content>
//                 </header>

//                 {children}
//             </article>
//         </div>
//     )
// }

// export default Route
