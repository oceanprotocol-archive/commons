import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
    it('renders default without crashing', () => {
        const { container } = render(<Input name="my-input" label="My Input" />)
        expect(container.firstChild).toBeInTheDocument()
        expect(container.querySelector('.label')).toHaveTextContent('My Input')

        const input = container.querySelector('.input')
        expect(input).toHaveAttribute('id', 'my-input')
        input && fireEvent.focus(input)
    })

    it('renders as text input by default', () => {
        const { container } = render(<Input name="my-input" label="My Input" />)
        expect(container.querySelector('.input')).toHaveAttribute(
            'type',
            'text'
        )
    })

    it('renders search', () => {
        const { container } = render(
            <Input name="my-input" label="My Input" type="search" />
        )
        const input = container.querySelector('.input')
        expect(input).toHaveAttribute('type', 'search')
        expect(container.querySelector('label + div')).toHaveClass(
            'inputWrapSearch'
        )

        input && fireEvent.focus(input)
    })

    it('renders select', () => {
        const { container } = render(
            <Input
                name="my-input"
                label="My Input"
                type="select"
                options={['hello', 'hello2']}
            />
        )
        expect(container.querySelector('select')).toBeInTheDocument()
    })

    it('renders textarea', () => {
        const { container } = render(
            <Input name="my-input" label="My Input" type="textarea" rows={40} />
        )
        expect(container.querySelector('textarea')).toBeInTheDocument()
    })

    it('renders radios', () => {
        const { container } = render(
            <Input
                name="my-input"
                label="My Input"
                type="radio"
                options={['hello', 'hello2']}
            />
        )
        expect(container.querySelector('input[type=radio]')).toBeInTheDocument()
    })

    it('renders checkboxes', () => {
        const { container } = render(
            <Input
                name="my-input"
                label="My Input"
                type="checkbox"
                options={['hello', 'hello2']}
            />
        )
        expect(
            container.querySelector('input[type=checkbox]')
        ).toBeInTheDocument()
    })

    it('renders date picker', () => {
        const { container } = render(
            <Input name="my-input" label="My Input" type="date" />
        )
        expect(
            container.querySelector('.react-datepicker-wrapper')
        ).toBeInTheDocument()
    })
})
