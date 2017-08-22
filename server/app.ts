import * as express from 'express';
import {json, urlencoded} from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import {frontPageRouter} from './routes/frontPageRouter';
import {apiRouter} from './routes/api';

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({extended: true}));

// api routes
// app.use('/api/secure', protectedRouter);
// app.use('/api/login', loginRouter);
// app.use('/api/public', publicRouter);
// app.use('/api/feed', feedRouter);
// app.use('/api/user', userRouter);
app.use('/api', apiRouter);

// TODO: Move this to routes in a dedicated router.
if (app.get('env') === 'production') {
  console.log('Production mode');
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
  // Handle all public pages routing for Angular2;
  app.use('/', frontPageRouter);
}

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export {app}
