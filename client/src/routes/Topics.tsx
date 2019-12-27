import React, { /*useContext,*/ Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import SlideUpCard from '../components/atoms/SlideUpCard'
import CategoryImage from '../components/atoms/CategoryImage'
import CategoryLink from '../components/atoms/CategoryLink'
import { Market } from '../context'
import styles from './Topics.module.scss'
// import withTracker from '../hoc/withTracker'
import Fade from 'react-reveal/Fade'

class Topics extends Component {
    public static contextType = Market

    render() {
        console.log(this.context.categories)
        return (
            <Route
            title="Topics"
            description="Research Topics"
            >
            <Content wide>
            <h2 className={styles.title}>Research Topics</h2>
            <div className={styles.categories}>
            {this.context.categories
                .sort((a: any, b: any) => a.localeCompare(b)) // sort alphabetically
                .map((category: string) => (
                    <Fade><SlideUpCard frontContent={
                        <CategoryLink
                        category={category}
                        key={category}
                        className={styles.category}
                        >
                        <CategoryImage category={category} />
                        <h3>{category}</h3>
                        </CategoryLink>
                    } backContent={
                        <CategoryLink
                        category={category}
                        key={category}
                        ><h3>3 results</h3></CategoryLink>
                    } ></SlideUpCard></Fade>
                ))}
                </div>
                </Content>
                </Route>
            )
    }

}

// export default withTracker(About)
export default Topics
