import React from 'react'
import { fireEvent, render, act } from '@testing-library/react'
import Dropzone from './Dropzone'

function mockData(files: any) {
    return {
        dataTransfer: {
            files,
            items: files.map((file: any) => ({
                kind: 'file',
                type: file.type,
                getAsFile: () => file
            })),
            types: ['Files']
        }
    }
}

function flushPromises(ui: any, container: any) {
    return new Promise(resolve =>
        setImmediate(() => {
            render(ui, { container })
            resolve(container)
        })
    )
}

function dispatchEvt(node: any, type: string, data: any) {
    const event = new Event(type, { bubbles: true })
    Object.assign(event, data)
    fireEvent(node, event)
}

test('invoke onDragEnter when dragenter event occurs', async () => {
    const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
        type: 'application/json'
    })
    const data = mockData([file])
    const handleOnDrop = jest.fn()

    await act(async () => {
        const ui = <Dropzone handleOnDrop={handleOnDrop} />
        const { container } = render(ui)

        // drop a file
        const dropzone = container.querySelector('div')
        dispatchEvt(dropzone, 'dragenter', data)
        dispatchEvt(dropzone, 'dragover', data)
        dispatchEvt(dropzone, 'drop', data)
        await flushPromises(ui, container)
    })

    expect(handleOnDrop).toHaveBeenCalled()
})
