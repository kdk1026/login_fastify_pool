const pool = require('../../utill/mysql_pool.js');
const bcrypt = require('bcrypt');

module.exports = function(fastify, opts, done) {

    fastify.get('/', function(request, reply) {
        const saltRounds = 10;
    
        const password = '1234';
        const encryptPassword = bcrypt.hashSync(password, saltRounds);

        console.log( 'encryptPassword : ', encryptPassword );

        const isPasswordCompare = bcrypt.compareSync(password, encryptPassword);

        console.log( 'same : ', isPasswordCompare );

        reply.send( {'encryptPassword' : encryptPassword, 'same' : isPasswordCompare} );
    });

    done();

}