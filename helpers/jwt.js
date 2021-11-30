const expressJwt = require('express-jwt');

function authJwt(){
    const api = process.env.API_URL
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoke: isRevoke
    }).unless({
        path: 
            [
                {url: /\/api\/v1\/products(.*)/,method:['GET','OPTIONS']},
                {url: /\/api\/v1\/categories(.*)/,method:['GET','OPTIONS']},
                `${api} + '/users/login`,
                `${api} + '/users/register`
            ]
    });
}

async function isRevoke(req,payload,done){
    if(!payload.isAdmin){
        done(null,true)
    }

    done();
}

module.exports = authJwt;