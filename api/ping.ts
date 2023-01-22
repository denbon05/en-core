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

export async function check(...params: any) {
  console.log({ params });

  return { done: 'pong' };
}
