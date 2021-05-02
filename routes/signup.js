const pool = require('../utill/mysql_pool.js');
const bcrypt = require('bcrypt');

module.exports = function(fastify, opts, done) {

    fastify.get('/', function(request, reply) {
        if ( !request.session.get('user') ) {
            reply.sendFile('signup.html');
        } else {
            reply.redirect('/');
        }
    });

    fastify.post('/', function(request, reply) {
        const saltRounds = 10;
        let encryptPassword = bcrypt.hashSync(request.body.password, saltRounds);

        let intputData = {
            email : request.body.email,
            name : request.body.name,
            pw : encryptPassword
        };

        pool.getConnection(function(err, conn) {
            conn.query('select * from user where email=?', [intputData.email], function(err, rows, fields) {
                if (err) {
                    reply.status(500).json(err);
                }

                if (rows.length) {
                    reply.send( {success : false} );
                } else {
                    conn.query('insert into user set ?', [intputData], function(err, rows, fields) {
                        if (err) {
                            reply.status(500).json(err);
                        }
                    });

                    let user = {
                        email : intputData.email,
                        name : intputData.name,
                    };

                    request.session.set('user', user);

                    reply.setCookie('login_name', request.session.get('user').name);

                    reply.send( {success : true} );
                }
            });

            pool.releaseConnection(conn);
        });

    });

    done();

}