export type Auth = {
  headers: {
    Authorization: Bearer;
    'X-BW-Access': AccountJWT;
  };
};

export type Bearer = string;
export type AccountJWT = string;
