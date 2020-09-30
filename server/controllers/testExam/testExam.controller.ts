// import {TestExam} from '../../models/test-exam.model'
import * as jwt from 'jsonwebtoken'
import { resQuestion, reqQuestion } from '../../models/question.model'
import { db } from './../../configs/database'
import * as firebaseHelper from "firebase-functions-helper/dist";
import { QuestionType } from "./../../utils/enum"

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

    return firebaseHelper.firestore.createNewDocument(db, collectionName, question).then(() => {
        res.status(200).send({
            'message': 'Add question successfull!!!',
            'error': null
        })
    }).catch(() => {
        console.log('Error when add questions')
        res.status(500).send('Add question error')
    })
}


export const getQuestionByID = async (req, res) => {
    let id: string = req.query.id;
    console.log(id)
    if (id != undefined) {
        let doc = await firebaseHelper.firestore.getDocument(db, collectionName, id)
        if (doc) {
            return res.send(doc)
        }
    }
    return res.status(400).send('Id not valid')
}

export const editQuestionById = async (req, res) => {
    let data: reqQuestion = req.body;
    let id = req.query.id
    if (id) {
        let doc = await firebaseHelper.firestore.getDocument(db, collectionName, id);
        if (doc) {
            for (let i in data) {
                doc.answer[i] = data[i]
            }
            db.collection(collectionName).doc(id).update(doc).then(() => {
                res.send("update successful")
            }).catch(error => {
                console.log(error)
                res.status(500).send("Update error")
            })
        }
    } else {
        return res.send('getAllQuestion')
    }

}

export const deleteQuestionById = async (req, res) => {
    let id = req.query.id
    if (id) {
        await firebaseHelper.firestore.deleteDocument(db,collectionName,id)
        res.send("Delete success!!!")
    }else{
        return res.status(400).send("Id invalid")
    }
}

export const shuffleQuestion = async (req,res) => {
    let type = req.query.type.toUpperCase()
    if ( Object.keys(QuestionType).indexOf(type) != -1 ) {
        return        
    }
    return res.send('asdfsadasd')
}