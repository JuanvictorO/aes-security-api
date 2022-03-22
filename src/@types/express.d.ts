declare namespace Express {
  export interface Request {
    cliente: {
      id: string;
      key_cript: string;
      seed: string;
    };
  }
}
