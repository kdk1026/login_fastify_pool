const fastify = require('fastify')({
    logger: false
});
const path = require('path');

fastify.register(require('fastify-secure-session'), {
    cookieName: 'my-session-cookie',
    secret: '›¹¼£-ð²Xj­œ«rÙà÷ã‹ÿów®3àŒ',  // 32 bytes
    cookie: {
        path: '/',
        httpOnly: true
    }
});

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
});

fastify.register(require('fastify-formbody'));

fastify.register(require('./routes'));

fastify.listen(3000, function(err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info('server listening on ${address}');
});