import React from 'react'
import { render } from '@testing-library/react'
import { DDO, MetaData } from '@oceanprotocol/squid'
import { BrowserRouter as Router } from 'react-router-dom'
import AssetDetails, { renderDatafilesLine } from './AssetDetails'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('AssetDetails', () => {
    it('renders loading without crashing', () => {
        const { container } = render(
            <AssetDetails
                metadata={({ base: { name: '' } } as any) as MetaData}
                ddo={({ proof: { creator: '0xxxxx' } } as any) as DDO}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with data', () => {
        const { container } = render(
            <Router>
                <AssetDetails
                    metadata={
                        ({
                            base: {
                                name: 'Hello',
                                description: 'Description',
                                categories: ['Category'],
                                files: [{ index: 0 }]
                            }
                        } as any) as MetaData
                    }
                    ddo={({ proof: { creator: '0xxxxx' } } as any) as DDO}
                />
            </Router>
        )
        expect(container.querySelector('.description')).toHaveTextContent(
            'Description'
        )
        expect(container.firstChild).toHaveTextContent('Category')
    })

    it('renderDatafilesLine renders correctly for one file', () => {
        const files = [
            {
                index: 0,
                url: 'https://hello.com'
            }
        ]
        const { container } = render(renderDatafilesLine(files))
        expect(container.firstChild).toHaveTextContent('1 data file')
    })

    it('renderDatafilesLine renders correctly for multiple files', () => {
        const files = [
            {
                index: 0,
                url: 'https://hello.com'
            },
            {
                index: 1,
                url: 'https://hello2.com'
            }
        ]
        const { container } = render(renderDatafilesLine(files))
        expect(container.firstChild).toHaveTextContent('2 data files')
    })
})
