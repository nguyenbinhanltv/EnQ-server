// import {TestExam} from '../../models/test-exam.model'
import * as jwt from 'jsonwebtoken'
import { resQuestion, reqQuestion } from '../../models/question.model'
import { db } from './../../configs/database'
import * as firebaseHelper from "firebase-functions-helper/dist";

const collectionName = 'questions'

export const addQuestion = (req, res) => {
    // let token = req.headers["token"];
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, adminData) => {
    //     if (error) {
    //         console.log(error);
    //         return res.status(400).send({
    //             error: "Invalid token",
    //         })
    //     }
    // });
    let question: reqQuestion = req.body
    
    return firebaseHelper.firestore.createNewDocument(db,collectionName,question).then(()=>{
        res.status(200).send({
            'message': 'Add question successfull!!!',
            'error': null
        })
    }).catch(()=>{
        console.log('Error when add questions')
        res.status(500).send('Add question error')
    })
}


export const getExamByID = (req, res) => {
    let id = req.query.id;
    console.log(id)
    if (id){
        firebaseHelper.firestore.getDocument(db,collectionName,id).then((doc)=>{
            if (doc) {
                return res.send(doc.data);
            }    
            return res.status(400).send("Invalid ID")
        })
    }
    return res.status(400).send('Id not valid')
}

export const getAllQuestion = (req, res) => {
    res.send('getAllQuestion')
}

export const getQuestionByID = (req, res) => {
    res.send('get question by id')
}