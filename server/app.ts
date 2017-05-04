import * as express from "express";
import {json, urlencoded} from "body-parser";
import * as path from "path";
import * as compression from "compression";

import {loginRouter} from "./routes/login";
import {protectedRouter} from "./routes/protected";
import {publicRouter} from "./routes/public";
import {feedRouter} from "./routes/feed";
import {userRouter} from "./routes/user";
import {frontPageRouter} from "./routes/frontPageRouter";

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

if (app.get('env') === 'production') {
  console.log('Production mode');
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
  //Handle all public pages routing for Angular2;
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

//
// function testConnection() {
//   console.log('Starting conn test');
//   const host: string = "mongodb://127.0.0.1:";
//   const port: number = 27017;
//   const db: string = 'MarinaStaneva';
//   const shareItUrl: string = host + port + '/' + db;
//   console.log(shareItUrl);
//   const MongoClient: any = require('mongodb').MongoClient;
//
//   MongoClient.connect(shareItUrl, (err, db) => {
//     assert.equal(null, err);
//     console.log("Connected correctly to MongoDB server.");
//     let dal = new DatabaseAccessLayer(db);
//     dal.getHomePageData().then((data: JSON) => {
//       console.log('Got the page data');
//       console.log('reusing types');
//       let pageData: HomePageData = Utils.JSONtoHomePageData(data);
//       console.log(pageData.moto);
//     });
//   });
//
// }
//
// testConnection();
export {app}
