const jwt = require('jsonwebtoken');

const secret = 'mysecretshhhhh';
const expiration = '2h';

module.exports = {
  signToken: ({ username, email, _id }) => {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
  },

  authMiddleware: ({ req }) => {
    // allows token to be sent via req.body, req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // if no toekn, return request object as is
    if (!token) {
      return req;
    }

    // separate "Bearer" from "<tokenvalue>"
    // HTTP headers: 
    /*
    {
      "Authorization": <type> <credentials>
    }
    {
      "Authorization": "Bearer <tokenvalue>"
    }
    */
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration })
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return updated request object
    return req;
  }
}
