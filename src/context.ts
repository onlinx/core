import { IncomingHttpHeaders, IncomingMessage } from 'http';
import { MimeTypes, UnknownObject } from './utils/types';

type HeadersUnion = string | number | string[]
export type HeadersObject = UnknownObject<HeadersUnion>

export interface ContextResponse {
  type: MimeTypes
  status: number
  headers: HeadersObject,
}
export interface ContextRequest {
  headers: IncomingHttpHeaders
  raw: IncomingMessage
}
const defaultResponse: ContextResponse = {
  type: 'text/plain',
  status: 404,
  headers: {},
};

interface Headers {
  get: (key: string) => string | string[] | undefined
  set: <T extends HeadersUnion>(key: string, value: T) => void
}

export class Context {
  readonly response: ContextResponse
  private request: ContextRequest

  readonly raw: IncomingMessage;

  headers: Headers
  data: UnknownObject
  constructor(request: ContextRequest) {
    this.raw = request.raw;
    this.data = {};
    // Makes sure that the defaultResponse is not mutated
    this.response = {
      ...defaultResponse
    };
    this.request = request;

    this.headers = {
      get: (key: string) => {
        return this.request.headers[key.toLowerCase()];
      },
      set: <T extends HeadersUnion>(key: string, value: T) => {
        this.response.headers[key] = value;
      }
    };
  }
  status(status: number): Context {
    this.response.status = status;
    return this;
  }
}

