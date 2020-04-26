import Box from '3box'
import { marketplaceId, boxUnionsModerator } from './config'

const DATA_UNIONS_THREAD = 'dataUnions'
const FOLLOWING_LIST_THREAD = 'followingList'

interface IDataUnion {
    address: string
    moderator: string
    name: string
    industry: string
    tag: string
    teaser: string
    description: string
}

interface IProperty {
    '@type': string
    name: string
    value: string
}

export interface IUnion {
    '@context': string
    '@type': string
    identifier: IProperty
    founder: {
        '@type': string
        identifier: IProperty
    }
    legalName: IProperty
    alternateName: IProperty
    knowsAbout: IProperty
    slogan: IProperty
    description: IProperty
}

export const getDataUnionSchema = (union: IDataUnion) => {
    return {
        '@context': 'http://schema.org/',
        '@type': 'Organization',
        identifier: {
            '@type': 'PropertyValue',
            name: 'address',
            value: `${union.address}`
        },
        founder: {
            '@type': 'Person',
            identifier: {
                '@type': 'PropertyValue',
                name: 'Ethereum',
                value: `${union.moderator}`
            }
        },
        legalName: {
            '@type': 'PropertyValue',
            name: 'name',
            value: `${union.name}`
        },
        alternateName: {
            '@type': 'PropertyValue',
            name: 'tag',
            value: `${union.tag}`
        },
        knowsAbout: {
            '@type': 'PropertyValue',
            name: 'industry',
            value: `${union.industry}`
        },
        slogan: {
            '@type': 'PropertyValue',
            name: 'teaser',
            value: `${union.teaser}`
        },
        description: {
            '@type': 'PropertyValue',
            name: 'description',
            value: `${union.description}`
        }
    }
}

export const getPersonSchema = (proofDid: string, address: string) => {
    return {
        '@context': 'http://schema.org/',
        '@type': 'Person',
        identifier: [
            {
                '@type': 'PropertyValue',
                name: 'DID',
                value: `did:3:${proofDid}`
            },
            {
                '@type': 'PropertyValue',
                name: 'Ethereum',
                // PropertyID: 'chainId_1',
                value: `${address}`
            }
        ]
    }
}

export const getDataUnions = async () => {
    const unions = await Box.getThread(
        marketplaceId,
        DATA_UNIONS_THREAD,
        boxUnionsModerator,
        false
    )
    return unions.map((union: any) => union.message)
}

export const getDataUnion = async (address: string) => {
    const unions = await getDataUnions()
    const union = unions.find(
        (union: IUnion) => union.identifier.value === address
    )
    const followers = await Box.getThreadByAddress(address)
    if (union) {
        return {
            union,
            followers: followers
        }
    } else {
        throw new Error('Data Union not found')
    }
}

export const getFollowingList = async (account: string) => {
    return await Box.getThread(
        marketplaceId,
        FOLLOWING_LIST_THREAD,
        account,
        true
    )
}

export const createDataUnion = async (
    space: any,
    unionId: string,
    unionData: IDataUnion
) => {
    const unionsRegistry = await space.joinThread(DATA_UNIONS_THREAD)
    const unions = await unionsRegistry.getPosts()
    if (
        !unions.find(
            (union: any) =>
                union.message.legalName.value.toLowerCase() ===
                unionData.name.toLowerCase()
        )
    ) {
        console.log('creating new Data Union')
        const union = await space.joinThread(unionId)
        const unionSchema = getDataUnionSchema(
            Object.assign(unionData, { address: union._address })
        )
        await unionsRegistry.post(unionSchema)
    } else {
        throw new Error('Data Union already exists')
    }
}

// export const joinDataUnion = async (box: any, space: any, unionAddress: string) => {
export const joinDataUnion = async (
    box: any,
    space: any,
    unionSchema: IUnion
) => {
    const union = await space.joinThreadByAddress(
        unionSchema.identifier.value,
        {
            firstModerator: unionSchema.founder.identifier.value,
            members: false
        }
    )
    if (union) {
        const id = await box.public.all()
        const personSchema = getPersonSchema(
            id.proof_did,
            box._3id.managementAddress
        )
        // register new follower into data union
        await union.post(personSchema)
        const followingList = await space.joinThread(FOLLOWING_LIST_THREAD, {
            members: true
        })
        const unions = await getDataUnions()
        // get joined union schema
        const unionSchema = unions.find(
            (_union: IUnion) => _union.identifier.value === union._address
        )
        // update user's following list
        await followingList.post(unionSchema)
    } else {
        throw new Error('Data Union not found')
    }
}

export const leaveDataUnion = async (
    box: any,
    space: any,
    unionSchema: IUnion
) => {
    const union = await space.joinThreadByAddress(
        unionSchema.identifier.value,
        {
            firstModerator: unionSchema.founder.identifier.value,
            members: false
        }
    )
    if (union) {
        const id = await box.public.all()
        const personSchema = getPersonSchema(
            id.proof_did,
            box._3id.managementAddress
        )
        console.log('personSchema', personSchema)
        const unionposts = await union.getPosts()
        const deletePosts = unionposts
            .filter((follower: any) => {
                return (
                    follower.message.identifier[0].value ===
                    personSchema.identifier[0].value
                )
            })
            .map((post: any) => {
                return union.deletePost(post.postId)
            })
        await Promise.all(deletePosts)
        const followingList = await space.joinThread(FOLLOWING_LIST_THREAD, {
            members: true
        })
        const followers = await followingList.getPosts()
        const deleteFollowers = followers.map((follow: any) => {
            return followingList.deletePost(follow.postId)
        })
        await Promise.all(deleteFollowers)
    } else {
        throw new Error('Data Union not found')
    }
}
