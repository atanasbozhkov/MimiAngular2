import * as express from 'express';
import {json, urlencoded} from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';

import {loginRouter} from './routes/login';
import {protectedRouter} from './routes/protected';
import {publicRouter} from './routes/public';
import {feedRouter} from './routes/feed';
import {userRouter} from './routes/user';
import {frontPageRouter} from './routes/frontPageRouter';
import {DatabaseAccessLayer} from './dao/DatabaseAccessLayer';
import {HomePageData} from './dao/types/HomePageData';
import {Utils} from './dao/Utils';
import {Collection} from './dao/enums/Collection';
import {ContactPageData} from './dao/types/ContactPageData';
import {PageType} from './dao/enums/PageType';
import {Db, MongoClient} from 'mongodb';

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({extended: true}));

// api routes
app.use('/api/secure', protectedRouter);
app.use('/api/login', loginRouter);
app.use('/api/public', publicRouter);
app.use('/api/feed', feedRouter);
app.use('/api/user', userRouter);

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


function testConnection() {
  console.log('Starting conn test');
  const host = 'mongodb://127.0.0.1:';
  const port = 27017;
  const dbName = 'MarinaStaneva';
  const shareItUrl: string = host + port + '/' + dbName;
  console.log(shareItUrl);

  MongoClient.connect(shareItUrl, (err, db: Db) => {
    console.log('Connected correctly to MongoDB server.');
    let dal = new DatabaseAccessLayer(db);
    dal.getPageData(PageType.CONTACT).then((data: ContactPageData) => {
      console.log('Got the contact data');
      console.log(data);
    });
  });

}

testConnection();
export {app}
