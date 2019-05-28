import React, { PureComponent } from 'react'
import cx from 'classnames'
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
import aiforgood from '../../img/aiforgood.jpg'
import fallback from '@oceanprotocol/art/jellyfish/jellyfish-back.svg'

const categoryImageFile = (category: string) => {
    switch (category) {
        case 'Agriculture & Bio Engineering':
        case 'agriculture':
            return agriculture
        case 'Anthropology & Archeology':
        case 'anthroarche':
            return anthroarche
        case 'Space & Astronomy':
        case 'astronomy':
            return astronomy
        case 'Biology':
        case 'biology':
            return biology
        case 'Business & Management':
        case 'business':
            return business
        case 'Chemistry':
        case 'chemistry':
            return chemistry
        case 'Communication & Journalism':
        case 'communication':
            return communication
        case 'Computer Technology':
        case 'computer':
            return computer
        case 'Dataset Of Datasets':
        case 'dataofdata':
            return dataofdata
        case 'Deep Learning':
        case 'deeplearning':
            return deeplearning
        case 'Demography':
        case 'demographics':
            return demographics
        case 'Earth & Climate':
        case 'earth':
            return earth
        case 'Economics & Finance':
        case 'economics-and-finance':
            return economics
        case 'Engineering':
        case 'engineering':
            return engineering
        case 'History':
        case 'history':
            return history
        case 'Image Recognition':
        case 'imagesets':
            return imagesets
        case 'Language':
        case 'language':
            return language
        case 'Law':
        case 'law':
            return law
        case 'Mathematics':
        case 'mathematics':
            return mathematics
        case 'Medicine':
        case 'Health & Medicine':
        case 'Health':
        case 'medicine':
            return medicine
        case 'Other':
        case 'other':
            return other
        case 'Performing Arts':
        case 'performingarts':
            return performingarts
        case 'Philosophy':
        case 'philosophy':
            return philosophy
        case 'Physics & Energy':
        case 'physics':
            return physics
        case 'Politics':
        case 'politics':
            return politics
        case 'Psychology':
        case 'psychology':
            return psychology
        case 'Sociology':
        case 'sociology':
            return sociology
        case 'Sports & Recreation':
        case 'sports':
            return sports
        case 'Theology':
        case 'theology':
            return theology
        case 'Transportation':
        case 'transport':
            return transport
        case 'Urban Planning':
        case 'urbanplanning':
            return urbanplanning
        case 'Visual Arts & Design':
        case 'visualart':
            return visualart
        // technically no category
        // but corresponding to title of a channel
        case 'AI For Good':
            return aiforgood
        default:
            return fallback
    }
}

export default class CategoryImage extends PureComponent<{
    category: string
    header?: boolean
    dimmed?: boolean
}> {
    public render() {
        const image = categoryImageFile(this.props.category)
        const classNames = cx(styles.categoryImage, {
            [styles.header]: this.props.header,
            [styles.dimmed]: this.props.dimmed
        })

        return (
            <div
                className={classNames}
                style={{ backgroundImage: `url(${image})` }}
            />
        )
    }
}
