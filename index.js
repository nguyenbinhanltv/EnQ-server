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
const usersRouter = require('./routers/users.router');
const testExamHistorysRouter = require('./routers/testExamHistorys.router');
const questionRouter = require('./routers/questions.router');
const answersRouter = require('./routers/answers.router');
const testExamsRouter = require('./routers/testExams.router');
const leadersRouter = require('./routers/leaders.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//API
app.use('/users', usersRouter);
app.use('/test-exam-history', testExamHistorysRouter);
app.use('/questions', questionRouter);
app.use('/answers', answersRouter);
app.use('/test-exam', testExamsRouter);
app.use('/leaders', leadersRouter);


app.listen(port, () => {
  console.log('Your server running at ' + port);
});