import { Blockchain } from './types';
export type Query = 'connect' | 'disconnect';

export const connectQuerySchema = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  signature,
  network,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  network: Blockchain;
}) => {
  return {
    operationName: 'follow',
    query: `mutation follow {\n  follow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", namespace: \"${namespace}\", signature: \"${signature}\", network: \"${network}\") {\n    result\n  }\n}\n`,
    variables: {},
  };
};

export const disconnectQuerySchema = ({
  fromAddr,
  toAddr,
  namespace,
  signature,
  network,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: String;
  network: Blockchain;
}) => {
  return {
    operationName: 'unfollow',
    query: `mutation unfollow {
        unfollow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", namespace: \"${namespace}\", signature: \"${signature}\", network: \"${network}\") {
              result
              }
            }`,
    variables: {},
  };
};

export const authSchema = ({
  address,
  signature,
  network = Blockchain.ETH,
}: {
  address: string;
  signature: string;
  network: Blockchain;
}) => {
  return {
    operationName: 'auth',
    query: `mutation auth($address: String!, $signature: String!, $network: String) {
      auth(address: $address, signature: $signature, network: $network) {
        result
        authToken
      }
    }`,
    variables: { address, signature, network },
  };
};

export const setAliasQuerySchema = ({
  fromAddr,
  toAddr,
  namespace,
  signature,
  alias,
  network = Blockchain.ETH,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  alias: string;
  network: Blockchain;
}) => {
  return {
    operationName: 'setAlias',
    query: `mutation setAlias {
        setAlias(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", namespace: \"${namespace}\", signature: \"${signature}\", network: \"${network}\") {
              result
              }
            }`,
    variables: {},
  };
};

export const querySchemas = {
  connect: connectQuerySchema,
  disconnect: disconnectQuerySchema,
  auth: authSchema,
  setAlias: setAliasQuerySchema,
};

export const request = async (url = '', data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });

  return response.json();
};

export const handleQuery = (
  data: {
    query: string;
    variables: object;
    operationName: string;
  },
  url: string,
) => {
  return request(url, data);
};

export const auth = ({
  address,
  signature,
  network = Blockchain.ETH,
  url,
}: {
  address: string;
  signature: string;
  network: Blockchain;
  url: string;
}) => {
  const result = querySchemas['auth']({
    address,
    signature,
    network,
  });
  return handleQuery(result, url);
};

export const follow = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  url,
  signature,
  network = Blockchain.ETH,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  url: string;
  network: Blockchain;
}) => {
  const schema = querySchemas['connect']({
    fromAddr,
    toAddr,
    alias,
    namespace,
    signature,
    network,
  });
  return handleQuery(schema, url);
};

export const unfollow = ({
  fromAddr,
  toAddr,
  namespace,
  url,
  signature,
  network = Blockchain.ETH,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  url: string;
  network: Blockchain;
}) => {
  const schema = querySchemas['disconnect']({
    fromAddr,
    toAddr,
    namespace,
    signature,
    network,
  });
  return handleQuery(schema, url);
};

export const setAlias = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  url,
  signature,
  network = Blockchain.ETH,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  url: string;
  network: Blockchain;
}) => {
  const schema = querySchemas['setAlias']({
    fromAddr,
    toAddr,
    alias,
    namespace,
    signature,
    network,
  });
  return handleQuery(schema, url);
};
