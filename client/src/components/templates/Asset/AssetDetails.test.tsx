import React from 'react'
import { render } from '@testing-library/react'
import { DDO, MetaData } from '@oceanprotocol/squid'
import { BrowserRouter as Router } from 'react-router-dom'
import AssetDetails, { datafilesLine } from './AssetDetails'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('AssetDetails', () => {
    it('renders loading without crashing', () => {
        const { container } = render(
            <AssetDetails
                metadata={({ main: { name: '' } } as any) as MetaData}
                ddo={({} as any) as DDO}
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
                            main: {
                                name: 'Hello',
                                files: [{ index: 0 }]
                            },
                            additionalInformation: {
                                description: 'Description',
                                categories: ['Category']
                            }
                        } as any) as MetaData
                    }
                    ddo={({} as any) as DDO}
                />
            </Router>
        )
        expect(container.querySelector('.description')).toHaveTextContent(
            'Description'
        )
        expect(container.firstChild).toHaveTextContent('Category')
    })

    it('datafilesLine renders correctly for one file', () => {
        const files = [
            {
                index: 0,
                url: 'https://hello.com'
            }
        ]
        const { container } = render(datafilesLine(files))
        expect(container.firstChild).toHaveTextContent('1 data file')
    })

    it('datafilesLine renders correctly for multiple files', () => {
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
        const { container } = render(datafilesLine(files))
        expect(container.firstChild).toHaveTextContent('2 data files')
    })
})
