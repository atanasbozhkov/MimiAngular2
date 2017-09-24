import {NextFunction, Request, Response, Router} from 'express';
import {pbkdf2} from 'crypto';
import {sign} from 'jsonwebtoken';
import {digest, length, secret} from '../config';

const loginRouter: Router = Router();
const ONE_DAY = '1d';
// TODO: Move this to the database at some point.
const user = {
  hashedPassword: 'be778015c3cd6d985bfcddb44a9f5e5bcb830fb233c6b3e450622ff58795d5e21057a1a1d4169f2c29eff09d715aabcb44b633687174b3c4d4bb08ab5479c8' +
  '8eb676eb2cc15aceb4c771648c68d69379f36302b219aa3c49f4d574b85e4db272a3d50f20a3c749ba60af73c0ec2114d2f54517e6f93e435324602070601b103a',
  salt: 'wtuBPQK/YYtr8BrzQS94lNyW617R+oY/Jf8OLWhY+R49ax1DbOTu6o+9XYThDdV7kdMxgmXCkLJIYnvEqg1TgfhOLmZHhadmwCBFFrp2UM3xWuwJTgLjTd2EjvgHo4' +
  'tx3EYGxMp/t0Ui0Lnf2wbule4yW+M/BvBv0oRtCDQ2S60=',
  username: 'marinastaneva'
};

// loginRouter.post('/signup', function (request: Request, response: Response, next: NextFunction) {
//     if (!request.body.hasOwnProperty('password')) {
//         let err = new Error('No password');
//         return next(err);
//     }
//
//     const salt = randomBytes(128).toString('base64');
//
//     pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
//         response.json({
//             hashed: hash.toString('hex'),
//             salt: salt
//         });
//     });
// });

// login method
loginRouter.post('/', function (request: Request, response: Response, next: NextFunction) {

  pbkdf2(request.body.password, user.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
    if (err) {
      console.log(err);
    }

    // check if password is active
    if (hash.toString('hex') === user.hashedPassword) {



      const token = sign({'user': user.username, permissions: []}, secret, {expiresIn: ONE_DAY});
      response.json({'jwt': token});

    } else {
      response.json({message: 'Wrong password'});
    }

  });
});

export {loginRouter}
