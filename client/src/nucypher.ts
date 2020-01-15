import axios from "axios"
import { nucypherAPI } from './config'
import { uploadJSON } from './utils/ipfs'

function createRandomHex(length = 10) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

async function encryptData(_username: string, _password: string, _aliceKey: string, _label: string, _data: any) {
    let form = new FormData();
    let files = 0;
    let texts = 0;
    let fileNames = {} as any;
    let textFields = {} as any;
    // for (let i = 0; i < _data.length; i++) {
    //     let element = _data[i];
    //     if (element.isFile === true) {
    //         let fileBuffer = element.value;

    //         form.append(files.toString(), fileBuffer);
    //         // console.log(fileBuffer)
    //         fileNames[files.toString()] = element.name;
    //         files++;
    //     } else {
	   //      textFields[element.name] = element.value;
	   //      texts++;
    //     }
    // }
    const keys = Object.keys(_data)
    texts = keys.length

    form.append("fileFieldCount", files.toString());
    form.append("textFieldCount", texts.toString());
    form.append("fileNames", JSON.stringify(fileNames));
    // form.append("textFields", JSON.stringify(textFields));
    form.append("textFields", JSON.stringify(_data));
    form.append("username", _username);
    form.append("password", _password);
    form.append("alice", _aliceKey);
    form.append("label", _label);

    let content = await axios.post(`${nucypherAPI}/encryptData`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    const { data } = content
    return {
        messageKit: data.message,
        label: data.label,
        policyPubKey: data.policy_public_key,
        aliceSigKey: data.alice_sig_pubkey,
        dataSource: data.data_source
    };
}

export const generateKeyPairs = async (userId: string, passwd: string) => {
    if (passwd.length < 16) {
    	throw new Error("Password should be more than 16 characters")
    }

    const rs = await axios.post(`${nucypherAPI}/generateKeys`, {
        username: userId,
        password: passwd
    });

    const { data } = rs;
    return {
        aliceKey: data.alice,
        bobKey: data.bob
    };
}


export const uploadDocument = async (
	// ipfs: any,
	_data: any,
	_uploader: string,
	_password: string,
	_aliceKey: string) => {

  // Encrypting data using Nucypher Devnet
  const _label = createRandomHex(10)

  let {
    messageKit,
    label,
    policyPubKey,
    aliceSigKey,
    dataSource
  }: any = await encryptData(_uploader, _password, _aliceKey, _label, _data);

  // return await uploadJSON(ipfs, {
  //   messageKit
  // })
  return {
    messageKit,
    label,
    policyPubKey,
    aliceSigKey,
    dataSource
  }
}

export const createPolicy = async (
	_password: string,
	_bobName: string,
	_aliceKey: string,
	_label: string) => {
    console.log("inside create policy")
    console.log(_password, _bobName, _aliceKey, _label)
    let content = await axios.post(`${nucypherAPI}/createPolicy`, {
        password: _password,
        bob: _bobName,
        alice: _aliceKey,
        label: _label
    });
    console.log("content:", content);
    return {
        done: true
    };
}

export const decryptDocument = async (
    _bobKeys: string,
    _policyPubKey: string,
    _aliceSigKey: string,
    _label: string,
    _messageKit: string,
    _data_source: string//,
    // _requestedObject
) => {
    // console.log('decryptDocument', _bobKeys, _policyPubKey, _aliceSigKey, _label, _messageKit, _data_source, _requestedObject)
    // // creating Request Object
    // let numFiles = 0;
    // let fileNames = [];
    // let numText = 0;
    // let textNames = [];
    // for (let i = 0; i < _requestedObject.length; i++) {
    //     let curr = _requestedObject[i];
    //     if (curr.isFile) {
    //         numFiles++;
    //         fileNames.push(curr.name);
    //     } else {
    //         numText++;
    //         textNames.push(curr.name);
    //     }
    // }

    let content = await axios.post(`${nucypherAPI}/decryptDelegated`, {
        bobKeys: _bobKeys,
        policy_public_key: _policyPubKey,
        alice_sig_pubkey: _aliceSigKey,
        label: _label,
        message: _messageKit,
        data_source: _data_source,
        // fileFieldCount: numFiles,
        // textFieldCount: numText,
        // filesKeys: fileNames,
        // textkeys: textNames
    });
    console.log('decryptDelegated response', content)
    const { data } = content
    // let dataArrayToBeReturned = [];
    // for (let i = 0; i < _requestedObject.length; i++) {
    //     if (_requestedObject[i].isFile === true) {
    //         let url = content.file_obj[_requestedObject[i].name];
    //         let objToBePushed = {
    //             isFile: true,
    //             name: _requestedObject[i].name,
    //             value: url
    //         };
    //         dataArrayToBeReturned.push(objToBePushed);
    //     } else {
    //         let objToBePushed = {
    //             isFile: false,
    //             name: _requestedObject[i].name,
    //             value: content.form_field_obj[_requestedObject[i].name]
    //         };
    //         dataArrayToBeReturned.push(objToBePushed);
    //     }
    // }

    // return dataArrayToBeReturned;
    return data
}