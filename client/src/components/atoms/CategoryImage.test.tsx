import React from 'react'
import { render } from 'react-testing-library'
import slugify from 'slugify'
import CategoryImage from './CategoryImage'
import formPublish from '../../data/form-publish.json'

describe('CategoryImage', () => {
    it('renders fallback image', () => {
        const { container, getByTestId } = render(
            <CategoryImage data-testid="image" category={''} />
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(getByTestId('image').style.backgroundImage).toMatch(
            /jellyfish-back/
        )
    })

    it('renders all the category images', () => {
        const { options } = formPublish.steps[1].fields
            ? formPublish.steps[1].fields.categories
            : []

        options.map((category: string) => {
            const { getByTestId } = render(
                <CategoryImage data-testid="image" category={category} />
            )
            expect(getByTestId('image')).toBeInTheDocument()
            // expect(getByTestId('image').style.backgroundImage).toMatch(
            //     slugify(category, { lower: true })
            // )
        })
    })
})
