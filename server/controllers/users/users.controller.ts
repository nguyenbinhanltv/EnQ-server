// Firebase
import * as admin from "firebase-admin";
import * as firebaseHelper from "firebase-functions-helper/dist";
import {merge} from "lodash";

// Model
import {User} from "../../models/user.model";

// Handlers
import {
    isEmailAlreadyExists,
    isUserAlreadyExists,
    validateUser,
} from "../../utils/handlers/index";
import {firestore} from "firebase-admin";

const db = admin.firestore();
const collectionName = "users";

// Create 1 user in firestore
export const createUser = async (req, res) => {
    const body: User = req.body;
    try {
        // Check user with email
        if (await isEmailAlreadyExists(db, collectionName, body.email)) {
            return res.status(400).send({
                message: "This user is already exist",
                error: null,
                data: null,
            });
        }

        // Check validate body
        const {value, error} = validateUser(body);
        if (error) {
            return res.status(400).send({
                error: error,
                message: null,
                data: null,
            });
        }

        return firebaseHelper.firestore
            .createNewDocument(db, collectionName, body)
            .then((doc) =>
                res.status(201).send({
                    message: "Register successfully",
                    error: null,
                    data: {user_id: doc.id},
                })
            )
            .catch((err) => {
                    console.log(err)
                    res.status(400).send({
                        error: err,
                        message: null,
                        data: null,
                    })
                }
            );
    } catch (error) {
        console.log(error)

        res.status(400).send({
            error: error + ", Bad error",
            message: null,
            data: null,
        });
    }
};

// Update 1 user in firestore
export const updateUser = async (req, res) => {
        const body = req.body;
        try {
            // const { value, error } = validateUser(body);
            // if (error) {
            //   return res.status(400).send({
            //     error: error,
            //     message: null,
            //     data: null,
            //   });
            // }
            let user = (await firebaseHelper.firestore.checkDocumentExists(db, collectionName, body._id)).data
            if (!user) {
                return res.status(400).send({
                    error: "This user doesn't exist",
                    message: null,
                    data: null,
                });
            }
            if (body.testExamHistory.length > 0) {
                let user_id = body._id;
                let test = body.testExamHistory[0];
                body.point = user.point + test.point

                // let history = []
                // for (let i = 0; i < test.length; i++) {
                let testExam = []
                for (let j = 0; j < test.testExam.questions.length; j++) {
                    testExam.push({
                        "question_id": test.testExam.questions[j]._id,
                        "answer": test.answers[j]
                    })

                }
                let history = {
                    "history": [{
                        "_id": Math.floor(Math.random() * Math.floor(99999)),
                        "point": test.point,
                        "user_id": user_id,
                        "timeStart": test.timeStart,
                        "timeEnd": test.timeStart,
                        "test_id": test.testExam._id,
                        "question": testExam
                    }]
                }
                // }

                let historyId = Math.floor(Math.random() * Math.floor(99999))
                let historyRef = db.collection('test_history').doc(user_id)
                let historyData = await (await historyRef.get()).data()
                if (!historyData) {
                    history.history[0]._id = historyId
                    await historyRef.set(history);
                } else {
                    historyData.history.find(history => history._id == historyId).then((history) => {
                        while (history.history[0]._id != history._id) {
                            history.history[0]._id = Math.floor(Math.random() * Math.floor(99999))
                        }
                    })
                    historyData.history.push(history.history[0])
                    await historyRef.update(historyData)
                }
            }
            return firebaseHelper.firestore
                .updateDocument(db, collectionName, body._id, body)
                .then((doc) =>
                    res.status(200).send({
                        message: `Update user ${body._id}:${body.email} successfully`,
                        error: null,
                        data: null,
                    })
                )
                .catch((err) =>
                    res.status(400).send({
                        error: err,
                        message: null,
                        data: null,
                    })
                );

        } catch
            (error) {
            console.log(error)
            res.status(400).send({
                error: error + ", Bad Error",
                message: null,
                data: null,
            });
        }
    }
;

// Delete 1 user in firestore
export const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Body doesn't has userId
        if (userId == undefined) {
            return res.status(400).send({
                error: "Must has userId in body",
                message: null,
                data: null,
            });
        }

        // Check is has user in firestore
        if ((await isUserAlreadyExists(db, collectionName, userId)) == false) {
            return res.status(400).send({
                error: `Doesn't has user ${userId}`,
                message: null,
                data: null,
            });
        }

        return firebaseHelper.firestore
            .deleteDocument(db, collectionName, userId)
            .then((doc) =>
                res.status(200).send({
                    message: `Delete user ${userId} successfully`,
                    error: null,
                    data: null,
                })
            )
            .catch((err) =>
                res.status(400).send({
                    error: err,
                    message: null,
                    data: null,
                })
            );
    } catch (error) {
        res.status(400).send({
            error: error + ", Bad Error",
            message: null,
            data: null,
        });
    }
};

// Get 1 user in firestore
export const getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Body doesn't has userId
        if (userId == undefined) {
            return res.status(400).send({
                error: "Must has userId in body",
                message: null,
                data: null,
            });
        }

        // Check user is already in firestore
        if ((await isUserAlreadyExists(db, collectionName, userId)) == false) {
            return res.status(400).send({
                error: `Doesn't has user ${userId}`,
                message: null,
                data: null,
            });
        }

        return firebaseHelper.firestore
            .getDocument(db, collectionName, userId)
            .then((doc) =>
                res.status(200).send({
                    message: "Success",
                    data: doc,
                    error: null,
                })
            )
            .catch((err) =>
                res.status(400).send({
                    error: err,
                    message: null,
                    data: null,
                })
            );
    } catch (error) {
        res.status(400).send({
            error: error + ", Bad Error",
            message: null,
            data: null,
        });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    let users = [];
    try {
        const usersRef = db.collection(collectionName);
        return await usersRef
            .get()
            .then((snapshot) =>
                snapshot.forEach((doc) => {
                    users.push(doc.data());
                })
            )
            .then((doc) =>
                res.status(200).send({
                    message: "Success",
                    data: users,
                    error: null,
                })
            )
            .catch((err) =>
                res.status(400).send({
                    error: err,
                    message: null,
                    data: null,
                })
            );
    } catch (error) {
        res.status(400).send({
            error: error + ", Bad Error",
            message: null,
            data: null,
        });
    }
};
