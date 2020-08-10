const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let serviceAccount = require('./serviceAccounts.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://enq-mobile.firebaseio.com"
});

//Router
const userRouter = require('./routers/user.router');
const testExamHistoryRouter = require('./routers/testExamHistory.router');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//API
app.use('/user', userRouter);
app.use('/test-exam-history', testExamHistoryRouter);

app.listen(port, () => {
  console.log('App running at port ' + port);
});