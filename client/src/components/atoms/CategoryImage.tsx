import React, { PureComponent } from 'react'
import styles from './CategoryImage.module.scss'

import agriculture from '../../img/categories/agriculture.jpg'
import anthroarche from '../../img/categories/anthroarche.jpg'
import astronomy from '../../img/categories/astronomy.jpg'
import biology from '../../img/categories/biology.jpg'
import business from '../../img/categories/business.jpg'
import chemistry from '../../img/categories/chemistry.jpg'
import communication from '../../img/categories/communication.jpg'
import computer from '../../img/categories/computer.jpg'
import dataofdata from '../../img/categories/dataofdata.jpg'
import deeplearning from '../../img/categories/deeplearning.jpg'
import demographics from '../../img/categories/demographics.jpg'
import earth from '../../img/categories/earth.jpg'
import economics from '../../img/categories/economics.jpg'
import engineering from '../../img/categories/engineering.jpg'
import history from '../../img/categories/history.jpg'
import imagesets from '../../img/categories/imagesets.jpg'
import language from '../../img/categories/language.jpg'
import law from '../../img/categories/law.jpg'
import mathematics from '../../img/categories/mathematics.jpg'
import medicine from '../../img/categories/medicine.jpg'
import other from '../../img/categories/other.jpg'
import performingarts from '../../img/categories/performingarts.jpg'
import philosophy from '../../img/categories/philosophy.jpg'
import physics from '../../img/categories/physics.jpg'
import politics from '../../img/categories/politics.jpg'
import psychology from '../../img/categories/psychology.jpg'
import sociology from '../../img/categories/sociology.jpg'
import sports from '../../img/categories/sports.jpg'
import theology from '../../img/categories/theology.jpg'
import transport from '../../img/categories/transport.jpg'
import urbanplanning from '../../img/categories/urbanplanning.jpg'
import visualart from '../../img/categories/visualart.jpg'

const categoryImageFile = (category: string) => {
    switch (category) {
        case 'agriculture':
            return agriculture
        case 'anthroarche':
            return anthroarche
        case 'astronomy':
            return astronomy
        case 'biology':
            return biology
        case 'business':
            return business
        case 'chemistry':
            return chemistry
        case 'communication':
            return communication
        case 'computer':
            return computer
        case 'dataofdata':
            return dataofdata
        case 'deeplearning':
            return deeplearning
        case 'demographics':
            return demographics
        case 'earth':
            return earth
        case 'economics-and-finance':
            return economics
        case 'engineering':
            return engineering
        case 'history':
            return history
        case 'imagesets':
            return imagesets
        case 'language':
            return language
        case 'law':
            return law
        case 'mathematics':
            return mathematics
        case 'medicine':
            return medicine
        case 'other':
            return other
        case 'performingarts':
            return performingarts
        case 'philosophy':
            return philosophy
        case 'physics':
            return physics
        case 'politics':
            return politics
        case 'psychology':
            return psychology
        case 'sociology':
            return sociology
        case 'sports':
            return sports
        case 'theology':
            return theology
        case 'transport':
            return transport
        case 'urbanplanning':
            return urbanplanning
        case 'visualart':
            return visualart
        default:
            break
    }
}

export default class CategoryImage extends PureComponent<{ category: string }> {
    public render() {
        const image = categoryImageFile(this.props.category)

        return (
            <div
                className={styles.categoryImage}
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
        )
    }
}
