import { toUtf8Bytes } from '@ethersproject/strings';
import { hexlify } from '@ethersproject/bytes';
import { auth } from './queries';
import { C_ACCESS_TOKEN_KEY } from './constant';
const msgToSign = 'Sign in to CyberConnect from this device';

export const personalSign = async (provider: any, address: string) => {
  return await provider.send('personal_sign', [
    hexlify(toUtf8Bytes(msgToSign)),
    address.toLowerCase(),
  ]);
};

export const cAuth = async (provider: any, address: string, url: string) => {
  if (window.localStorage.getItem(C_ACCESS_TOKEN_KEY)) {
    return window.localStorage.getItem(C_ACCESS_TOKEN_KEY);
  }
  const signature = await personalSign(provider, address);
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
        C_ACCESS_TOKEN_KEY,
        res.data.auth.authToken,
      );
      return res;
    }
  }
};
