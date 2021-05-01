const pool = require('../utill/mysql_pool.js');

module.exports = function(fastify, opts, done) {

    fastify.get('/', function(request, reply) {
        reply.sendFile('login.html');
    });

    fastify.post('/', function(request, reply) {
        let email = request.body.email;

        pool.getConnection(function(err, conn) {
            conn.query('select * from user where email=?', [email], function(err, rows, fields) {
                if (err) {
                    reply.status(500).json(err);
                }

                if (rows.length) {
                    let user = {
                        email : rows[0].email,
                        name : rows[0].name
                    };

                    request.session.set('user', user);

                    reply.setCookie('login_name', request.session.get('user').name);

                    reply.send( {success : true} );
                } else {
                    reply.send( {success : false} );
                }
            });

            pool.releaseConnection(conn);
        });

    });

    done();

}