module.exports = function(fastify, opts, done) {

    fastify.get('/', function(request, reply) {
        reply.sendFile('index.html');
    });

    fastify.get('/main', function(request, reply) {
        if ( request.session.get('user') ) {
            reply.sendFile('main.html');
        } else {
            reply.redirect('/login');
        }
    });

    fastify.register(require('./login'), { prefix: '/login' });
    fastify.register(require('./logout'), { prefix: '/logout' });
    fastify.register(require('./signup'), { prefix: '/signup' });
    fastify.register(require('./test/test'), { prefix: '/test' });

    done();

}