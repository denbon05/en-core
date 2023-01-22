import type { IncomingMessage, ServerResponse } from 'http'

// ? this module watched without additional config in nuxt
export default async (
  req: IncomingMessage,
  res: ServerResponse,
  _next: (err: Error) => void
) => {
  // console.log({ res })
  // console.log({ req })
  // todo: use req.url to extract method from api
  console.log('url: ', req.url)
  // @ts-ignore
  // console.log('url: ', req._parsedUrl)
  // console.log({ _next: _next.toString() })
  // let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, '')
  // url = url.split('/');
  // console.log({ url });
  // const method = url.pop();
  // const controller = url.slice(1).join('/');
  // const api = require(`../api/${controller}.ts`);
  // if (req.headers.authorization) {
  // }
  // const result = await api[method](req.params);

  res.end(JSON.stringify({ hi: 'from api-server' }))
}
