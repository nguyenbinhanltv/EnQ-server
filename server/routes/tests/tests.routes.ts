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
        this.routes.get('/question',testController.getExamByID); // /question?id=123
        this.routes.post('/add-question',testController.addQuestion);
        this.routes.post('/edit-question');
        this.routes.post('/delete-question');
        //mobile
        this.routes.get('/get-test-exam');

   }
}

export const testExamRoutes = new TestExamRoute().routes