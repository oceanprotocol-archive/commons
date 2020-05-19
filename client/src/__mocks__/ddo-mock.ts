import { DDO } from '@oceanprotocol/squid'

const ddoMock = ({
    id: 'xxx',
    findServiceByType: () => {
        return { index: 'xxx' }
    }
} as any) as DDO

export default ddoMock
