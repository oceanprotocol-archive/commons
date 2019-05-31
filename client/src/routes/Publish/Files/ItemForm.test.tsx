import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ItemForm from './ItemForm'

const addItem = jest.fn()

const setup = () => {
    const utils = render(<ItemForm placeholder={'Hello'} addItem={addItem} />)
    const input = utils.getByPlaceholderText('Hello')
    const button = utils.getByText('Add File')
    const { container } = utils
    return {
        input,
        button,
        container,
        ...utils
    }
}

describe('ItemForm', () => {
    it('renders without crashing', () => {
        const { container } = setup()
        expect(container.firstChild).toBeInTheDocument()
    })

    it('fires addItem', async () => {
        const { input, button } = setup()

        fireEvent.change(input, {
            target: { value: 'https://hello.com' }
        })
        fireEvent.click(button)
        expect(addItem).toHaveBeenCalled()
    })

    it('does not fire addItem when no url present', () => {
        const { input, button, container } = setup()

        // empty url
        fireEvent.change(input, {
            target: { value: '' }
        })
        fireEvent.click(button)
        expect(container.querySelector('.error')).toHaveTextContent(
            'Please fill in all required fields.'
        )

        // invalid url
        fireEvent.change(input, {
            target: { value: 'blabla' }
        })
        fireEvent.click(button)
        expect(container.querySelector('.error')).toHaveTextContent(
            'Please enter a valid URL.'
        )

        // clear out errors
        fireEvent.change(input, {
            target: { value: 'blablabla' }
        })
        expect(container.querySelector('.error')).not.toBeInTheDocument()
    })
})
