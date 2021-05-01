module.exports = function(fastify, opts, done) {

    fastify.get('/', function(request, reply) {
        if ( request.session.get('user') ) {
            request.session.delete();
            reply.clearCookie('login_name');
            reply.redirect('/login');
        }
    });

    done();

}