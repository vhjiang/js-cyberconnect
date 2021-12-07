export type Query = 'connect' | 'disconnect';

export const connectQuerySchema = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
}) => {
  return {
    operationName: 'follow',
    query: `mutation follow {\n  follow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", namespace: \"${namespace}\", signature: \"${signature}\") {\n    result\n  }\n}\n`,
    variables: {},
  };
};

export const disconnectQuerySchema = ({
  fromAddr,
  toAddr,
  namespace,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: String;
}) => {
  return {
    operationName: 'unfollow',
    query: `mutation unfollow {\n  unfollow(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", namespace: \"${namespace}\", signature: \"${signature}\") {\n    result\n  }\n}\n`,
    variables: {},
  };
};

export const setAliasQuerySchema = ({
  fromAddr,
  toAddr,
  namespace,
  signature,
  alias,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  alias: string;
}) => {
  return {
    operationName: 'setAlias',
    query: `mutation setAlias {\n  setAlias(fromAddr: \"${fromAddr}\", toAddr: \"${toAddr}\", alias: \"${alias}\", namespace: \"${namespace}\", signature: \"${signature}\") {\n    result\n  }\n}\n`,
    variables: {},
  };
};

export const querySchemas = {
  connect: connectQuerySchema,
  disconnect: disconnectQuerySchema,
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
  url: string
) => {
  return request(url, data);
};

export const follow = ({
  fromAddr,
  toAddr,
  alias,
  namespace,
  url,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  url: string;
}) => {
  const schema = querySchemas['connect']({
    fromAddr,
    toAddr,
    alias,
    namespace,
    signature,
  });
  return handleQuery(schema, url);
};

export const unfollow = ({
  fromAddr,
  toAddr,
  namespace,
  url,
  signature,
}: {
  fromAddr: string;
  toAddr: string;
  namespace: string;
  signature: string;
  url: string;
}) => {
  const schema = querySchemas['disconnect']({
    fromAddr,
    toAddr,
    namespace,
    signature,
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
}: {
  fromAddr: string;
  toAddr: string;
  alias: string;
  namespace: string;
  signature: string;
  url: string;
}) => {
  const schema = querySchemas['setAlias']({
    fromAddr,
    toAddr,
    alias,
    namespace,
    signature,
  });
  return handleQuery(schema, url);
};
