import Box from '3box';
import Web3 from 'web3';

import {
	boxSpaceName
} from './config'

/**
 * Request access to 3Box
 *
 * @param {string} address  User account address
 * @param {Web3} web3  Web3Provider
 *
 * @returns {Box} opened 3Box account
 */
export const requestAccessTo3box = async (address: string, web3: Web3) => {
  const box = await Box.openBox(address, web3.currentProvider);
  const boxSyncPromise = new Promise((resolve, reject) => box.onSyncDone(resolve));
  boxSyncPromise.then(() => console.log('3box synced!!'));
  return box;
};

export const isLoggedIn = async (address: string) => {
	const isLoggedIn = await Box.isLoggedIn(address);
  	console.log('3box is loggedIn', isLoggedIn);
  	return isLoggedIn
};

/**
 * Attempt to get user `boxSpaceName` 3Box space from address
 *
 * @param {string} address User account address
 *
 * @returns {Object} with public `boxSpaceName` space data
 */
export const get3boxSpace = async (address: string, box: any = null) => {
	const space = !box ? (await Box.getSpace(address, boxSpaceName)):(await box.openSpace(boxSpaceName));
	await space.syncDone;
	return space;
}

/**
 * Get user 3Box profile
 *
 * @param {string} address  User account address
 *
 * @returns {Object} with User properties
 */
export const get3boxProfile = async (address: string) => {
  const ipfsGateway = 'https://ipfs.infura.io/ipfs/';
  const profile = await Box.getProfile(address);
  console.log('get3boxProfile profile', profile);
  const data = {
    address,
    name: profile.name,
    website: profile.website,
    avatar: profile.image && ipfsGateway + profile.image[0].contentUrl['/'],
  };
  return data;
};

/**
 * Attempt to get user public profile data from a given Space
 *
 * @param {string} address  User account address
 * @param {Space} boxSpaceNameSpace  Opened boxSpaceName 3Box space
 *
 * @returns {Object} with user public profile data from `boxSpaceName` space
 */
export const get3boxSpaceData = async (address: string, boxSpace: any) => {
  const avatar = await boxSpace.public.get(`${boxSpaceName}.image`);
  return {
    address,
    name: await boxSpace.public.get(`${boxSpaceName}.name`),
    avatar: avatar && avatar[0].contentUrl,
    linkedin: await boxSpace.public.get(`${boxSpaceName}.url`),
    email: await boxSpace.private.get(`${boxSpaceName}.email`),
  };
};

/**
 * Update User profile on 3Box
 *
 * @param {Space} boxSpaceNameSpace  Opened boxSpaceName 3Box space
 * @param {User} user  User object
 * @param {string} defaultProfile  Default 3Box profile
 * @param beforeSave  Callback to be triggered after the user is updated on 3Box `boxSpaceName` Space
 * @param afterSaved  Callback to be triggered after the data is updated on 3Box `boxSpaceName` Space
 */
export const update3boxSpace = async (
  boxSpace: any,
  user: any,
  defaultProfile = boxSpaceName,
  beforeSave = () => {},
  afterSaved = () => {},
) => {
  // const { ipfsGateway } = config;
  // Disabled as giverId is not being assigned through smart contract event
  // beforeSave(!user.giverId);
  // beforeSave(false);
  const fields = ['defaultProfile'];
  const values = [defaultProfile];
  if (defaultProfile === boxSpaceName) {
    fields.push(`${boxSpaceName}.name`);
    values.push(user.name);
    if (user.linkedin) {
      fields.push(`${boxSpaceName}.url`);
      values.push(user.linkedin);
    }
    // if (user.avatar && !user.avatar.match(/^http/)) {
    //   const imageIPFSHash = user.avatar.replace('/ipfs/', '');
    //   user.avatar = `${ipfsGateway}${imageIPFSHash}`;
    //   const imageObject = [
    //     {
    //       '@type': 'ImageObject',
    //       contentUrl: user.avatar,
    //       cid: { '/': imageIPFSHash },
    //     },
    //   ];
    //   fields.push('boxSpaceName.image');
    //   values.push(imageObject);
    // }
  }
  await boxSpace.public.setMultiple(fields, values);
  if (user.email) await boxSpace.private.set(`${boxSpaceName}.email`, user.email);
  // Disabled as giverId is not being assigned through smart contract event
  // afterSaved(!user.giverId);
  // afterSaved(false);
};

/**
 * Loads a user profile from 3Box based on its `defaultProfile` property
 *
 * @param {string} address  User account address
 *
 * @returns {Object} Object with user public profile
 */
export const load3BoxPublicProfile = async (address: string) => {
  // const spaces = await Box.listSpaces(address);
  // console.log('SPACES', address, spaces)
  // const profile = spaces.includes('boxSpaceName') ? await getboxSpaceName3boxSpace(address): {};
  const profile = await get3boxSpace(address);
  if (!profile.defaultProfile) return undefined;
  if (profile.defaultProfile === '3box') {
    return await get3boxProfile(address);
  }
  return {
    name: profile[`${boxSpaceName}.name`],
    avatar: profile[`${boxSpaceName}.image`] && profile[`${boxSpaceName}.image`][0].contentUrl,
    linkedin: profile[`${boxSpaceName}.url`],
  };
};

export const getCommunityThread = async (userAddress: string, communityId: string) => {
	const onlyMembers = false // false -> open community
	const communityThread = await Box.getThread(boxSpaceName, communityId, userAddress, onlyMembers);
	return communityThread;
};

export const followCommunity = async (userAddress: string, proofDid: string, communityThread: any) => {
	const chainId = 1;
	const contact = {
	    '@context': 'http://schema.org/',
	    '@type': 'Person',
	    identifier: [{
	        '@type': 'PropertyValue',
	        name: 'DID',
        	value: `did:3:${proofDid}`,
      	},
      	{
	        '@type': 'PropertyValue',
	        name: 'Ethereum',
	        PropertyID: `chainId_${chainId}`,
	        value: userAddress,
    	}]
	};
	communityThread.post(contact);
}