// import {TestExam} from '../../models/test-exam.model'
import * as jwt from "jsonwebtoken";
import {resQuestion, reqQuestion} from "../../models/question.model";
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";
import {QuestionType} from "./../../utils/enum";
import {
    validateQuestion,
    isAlreadyQuestion,
    getAllQuestionsByRank,
    getAllQuestionsByType,
    getRandomQuestions,
    getAllQuestionsByTypeAndRank,
} from "../../utils/handlers/index";
import {TestExam} from "models/test-exam.model";

const collectionName = "questions";
const db = admin.firestore();

export const addQuestion = async (req, res) => {
    const token = req.headers["token"];
    let body: resQuestion = req.body;

    try {
        if (token != undefined) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, adminData) => {
                if (error) {
                    return res.status(400).send({
                        error: "Invalid token",
                        data: null,
                        message: null,
                    });
                }

                if (adminData) {
                    const {value, error} = validateQuestion(body);
                    if (error) {
                        return res.status(400).send({
                            error: error,
                            data: null,
                            message: null,
                        });
                    }
                    if (value) {
                        return firebaseHelper.firestore
                            .createNewDocument(db, collectionName, body)
                            .then((doc) => {
                                body._id = doc.id;

                                firebaseHelper.firestore
                                    .updateDocument(db, collectionName, body._id, body)
                                    .then(() => {
                                        res.status(200).send({
                                            message: "Add question successfully",
                                            error: null,
                                            data: null,
                                        });
                                    })
                                    .catch((error) =>
                                        res.status(400).send({
                                            error: error,
                                            message: null,
                                            data: null,
                                        })
                                    );
                            })
                            .catch((error) => {
                                return res.status(400).send({
                                    error: "Add question error" + error,
                                    data: null,
                                    message: null,
                                });
                            });
                    }
                }
            });
        }
    } catch (error) {
        return res.status(400).send({
            error: error + " ,Bad Error",
            data: null,
            message: null,
        });
    }
};

export const getQuestionByID = async (req, res) => {
    const _id: string = req.params.questionId;

    try {
        if (_id != undefined) {
            return await firebaseHelper.firestore
                .getDocument(db, collectionName, _id)
                .then((doc) =>
                    res.status(200).send({
                        message: "OK",
                        data: doc,
                        error: null
                    })
                )
                .catch((error) =>
                    res.status(400).send({
                        error: "Invalid question",
                        data: null,
                        message: null,
                    })
                );
        }
    } catch (error) {
        return res.status(400).send({
            error: "Id not valid",
            message: null,
            data: null,
        });
    }
};

export const getAllquestion = async (req, res) => {
    let data = [];
    const questionsRef = db.collection(collectionName);
    try {
        await questionsRef.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    res.status(400).send({
                        error: "No question for you",
                        data: null,
                        message: null,
                    })
                } else {
                    snapshot.forEach(doc => data.push(doc.data()));
                }
            })
            .then(() => {
                res.status(200).send({
                    message: "OK",
                    data: data,
                    error: null,
                })
            })
            .catch(err => {
                res.status(400).send({
                    error: "Error form snapshot",
                    data: null,
                    message: null,
                })
            })
    } catch (err) {
        res.status(400).send({
            error: err + " , Bad Error",
            data: null,
            message: null,
        });
    }
}

export const editQuestionById = async (req, res) => {
    const body: reqQuestion = req.body;
    const _id = req.params.questionId;

    try {
        const {value, error} = validateQuestion(body);
        if (error) {
            return res.status(400).send({
                error: "Invalid question",
                data: null,
                message: null,
            });
        }
        if (value) {
            return firebaseHelper
                .firestore
                .checkDocumentExists(db, collectionName, _id)
                .then(result => {
                    if (result.exists) {
                        return firebaseHelper.firestore
                            .updateDocument(db, collectionName, _id, body)
                            .then((doc) =>
                                res.status(200).send({
                                    message: "Update successfully",
                                    data: null,
                                    error: null,
                                })
                            )
                            .catch((err) =>
                                res.status(400).send({
                                    error: "Invalid question",
                                    data: null,
                                    message: null,
                                })
                            );
                    }

                    return res.status(400).send({
                        error: "Invalid question",
                        data: null,
                        message: null
                    });
                });
        }
    } catch (error) {
        return res.status(400).send({
            error: error + " Bad Error",
            data: null,
            message: null,
        });
    }
};

export const deleteQuestionById = async (req, res) => {
    const _id = req.params.questionId;
    try {
        if (_id) {
            return firebaseHelper.firestore
                .checkDocumentExists(db, collectionName, _id)
                .then((result) => {
                    if (result.exists) {
                        return firebaseHelper.firestore
                            .deleteDocument(db, collectionName, _id)
                            .then(() =>
                                res.status(200).send({
                                    message: "Delete question successfully",
                                    data: null,
                                    error: null,
                                })
                            )
                            .catch((err) =>
                                res.status(400).send({
                                    error: err,
                                    data: null,
                                    message: null,
                                })
                            );
                    }

                    return res.status(400).send({
                        error: "Doesn't have question",
                        data: null,
                        message: null,
                    });
                })
                .catch((err) =>
                    res.status(400).send({
                        error: err,
                        data: null,
                        message: null,
                    })
                );
        } else {
            return res.status(400).send({
                error: "Id invalid",
                message: null,
                data: null,
            });
        }
    } catch (error) {
        return res.status(400).send({
            error: error + " ,Bad Error",
            data: null,
            message: null,
        });
    }
};

export const getTestExamByType = async (req, res) => {
    const type: number = req.query.type;
    const questions: Array<resQuestion> = await getAllQuestionsByType(
        db,
        "questions",
        type
    )
        .then((data) => data)
        .catch((err) => null);
    try {
        if (questions) {
            let data = getRandomQuestions(questions);
            return res.status(200).send({
                message: "OK",
                data: data,
                error: null,
            });
        }
        return res.send({
            error: "No test exam for you :D",
            message: null,
            data: null,
        });
    } catch (error) {
        return res.status(400).send({
            error: error + " ,Bad Error",
            message: null,
            data: null,
        });
    }
};

export const getTestExamByRank = async (req, res) => {
    const rank: number = req.query.rank;
    const questions: Array<resQuestion> = await getAllQuestionsByRank(
        db,
        "questions",
        rank
    )
        .then((data) => data)
        .catch((err) => null);
    try {
        if (questions) {
            let data = getRandomQuestions(questions);
            return res.status(200).send({
                message: "OK",
                data: data,
                error: null,
            });
        }
        return res.send({
            error: "No test exam for you :D",
            message: null,
            data: null,
        });
    } catch (error) {
        return res.status(400).send({
            error: error + " ,Bad Error",
            message: null,
            data: null,
        });
    }
};

export const getTestExamByTypeAndRank = async (req, res) => {
    const rank: number = req.query.rank;
    const type: number = req.query.type;
    const questions: Array<resQuestion> = await getAllQuestionsByTypeAndRank(
        db,
        "questions",
        type,
        rank
    )
        .then((data) => data)
        .catch((err) => null);
    try {
        if (questions) {
            let data = getRandomQuestions(questions);

            return await firebaseHelper.firestore
                .createNewDocument(db, "test-exam", {
                    questions: data,
                    rank: rank,
                    type: type,
                } as TestExam)
                .then((doc) => {
                    console.log(doc.id);
                    firebaseHelper.firestore
                        .updateDocument(db, "test-exam", doc.id, {
                            _id: doc.id
                        })
                        .then()
                        .catch(err =>
                            res.status(400).send({
                                error: err,
                                message: null,
                                data: null,
                            }))

                    return res.status(200).send({
                        message: "OK",
                        data: {
                            _id: doc.id,
                            questions: data,
                            type: type,
                            rank: rank,
                        } as TestExam,
                        error: null,
                    });
                })
                .catch((err) =>
                    res.status(400).send({
                        error: err,
                        message: null,
                        data: null,
                    })
                );
        }

        return res.send({
            error: "No test exam for you :D",
            message: null,
            data: null,
        });
    } catch (error) {
        return res.status(400).send({
            error: error + " ,Bad Error",
            message: null,
            data: null,
        });
    }
};

export const getHistory = async (req, res) => {
    let isRecent = req.body.isRecent
    let user_id = req.body.user_id;
    if (!user_id) {
        return res.status(400).send({
            error: "User Id không hợp lệ",
            message: null,
            data: null
        })
    }
    let historyRef = db.collection('test_history').doc(user_id)
    let historyData = await historyRef.get().then(doc => {
        return doc.data()
    })


    if (!historyData) {
        return res.status(400).send({
            error: "NO TEST",
            message: "Bạn chưa có bài test nào",
            data: null
        })
    }
    historyData = historyData.history
    let limit = historyData.length
    if (isRecent) {
        historyData.sort(function (a, b) {
            return (a.timeEnd - b.timeEnd)
        })
        limit = 3
    } else {
        historyData.sort(function (a, b) {
            return (a.point - b.point);
        })
    }
    // console.log(historyData)
    for (let i = 0; i < limit; i++) {
        // console.log(typeof historyData[i].timeStart)
        historyData[i].timeStart = new Date(historyData[i].timeStart).toLocaleString()
        historyData[i].timeEnd = new Date(historyData[i].timeEnd).toLocaleString()
    }
    return res.status(200).send({
        error: null,
        message: null,
        data: historyData
    })
}

export const detailHistory = async (req, res) => {
    let user_id = req.body.user_id
    let historyId = req.body.history_id

    try {
        let historyCollection = (await db.collection('test_history').doc(user_id).get()).data().history
        if (historyCollection) {
            let historyDetail = historyCollection.find(history => history._id == historyId)
            let testExamRef = (await db.collection('test-exam').doc(historyDetail.test_id).get()).data()
            let totalPoint = 0
            for (let i = 0; i < historyDetail.question.length; i++) {
                console.log(historyDetail.question[i].question_id)
                let questionRef = testExamRef.questions.find(question => question.question_id == historyDetail.question[i]._id)
                questionRef = {...{userChoice: historyDetail.question[i].answer, isTrue: false}, ...questionRef}

                if (questionRef.answer.correctAnswer == questionRef.userChoice) {
                    totalPoint += 1
                    questionRef.isTrue = true
                }

                historyDetail.question[i] = questionRef
            }
            return res.status(200).send({
                error: null,
                message: null,
                data: historyDetail
            })
        }
        return res.status(400).send({
            error: 'Không có test này',
            message: "Không có test này",
            data: null
        })
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            error: e,
            message: "Lỗi không xác đinh",
            data: null
        })
    }
}
