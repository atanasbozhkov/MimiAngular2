import {NextFunction, Request, Response, Router} from 'express';
import {verify} from 'jsonwebtoken';
import {secret} from '../config';
import * as path from 'path';

const protectedRouter: Router = Router();

protectedRouter.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;

  verify(token, secret, function (tokenError) {
    if (tokenError) {
      return response.redirect('/login');
    }

    next();
  });
});

protectedRouter.get('/', (request: Request, response: Response) => {
    response.json({
        text: 'Greetings, you have valid token.',
        title: 'Protected call'
    });
});

export {protectedRouter}





