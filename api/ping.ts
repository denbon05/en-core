// import Fastify from 'fastify';

// const fastify = Fastify({
//   logger: true,
// });

// fastify.post('/check', function (request, reply) {
//   reply.send({ hello: 'world' });
// });

// const start = async () => {
//   try {
//     await fastify.listen({ port: 3001 });
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();

// eslint-disable-next-line require-await
export async function check(...params: any) {
  // eslint-disable-next-line no-console
  console.log({ params });

  return { done: 'pong' };
}
