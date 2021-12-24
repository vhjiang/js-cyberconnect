import { toUtf8Bytes } from '@ethersproject/strings';
import { hexlify } from '@ethersproject/bytes';
import { auth } from './queries';

const msgToSign = 'Sign in to CyberConnect from this device';
export const localstorageKeyNameSpace = 'CYBERCONNECT_ACCESS_TOKEN';

export const personalSign = async (provider: any, address: string) => {
  return await provider.send('personal_sign', [
    hexlify(toUtf8Bytes(msgToSign)),
    address.toLowerCase(),
  ]);
};

export const cAuth = async (provider: any, address: string, url: string) => {
  const signature = await personalSign(provider, address);
  console.log(signature);
  if (signature) {
    let sig;
    if (typeof signature == 'string') {
      sig = signature;
    } else if (signature.result) {
      sig = signature.result;
    } else {
      return;
    }
    const res = await auth({
      address,
      signature: sig,
      url,
    });
    if (
      res.data &&
      res.data.auth.result === 'SUCCESS' &&
      res.data.auth.authToken
    ) {
      window?.localStorage?.setItem(
        localstorageKeyNameSpace,
        res.data.auth.authToken,
      );
      return res;
    }
  }
};
