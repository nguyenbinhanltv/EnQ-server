import {Router} from 'express'
import * as testController from '../../controllers/testExam/testExam.controller'

class TestExamRoute {
   public routes:Router;

   constructor() {
       this.routes = Router()
       this._init()
   }

   _init(){
        //admin
        this.routes.get('/question',testController.getQuestionByID); // /question?id=123
        this.routes.post('/add-question',testController.addQuestion);
        this.routes.post('/edit-question',testController.editQuestionById);
        this.routes.post('/delete-question',testController.deleteQuestionById);
        //mobile
        this.routes.get('/get-test-exam',testController.shuffleQuestion);

   }
}

export const testExamRoutes = new TestExamRoute().routes