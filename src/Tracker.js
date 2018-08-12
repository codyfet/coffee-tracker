import React from 'react';
import ReactDOM from 'react-dom';

import {Button} from "react-bootstrap";

import {database} from './Config/config.js';

export class Tracker extends React.Component {
    state = {
        isLoading: true,
        cups: []
    }

    componentDidMount () {
        // Вынимаем из БД из коллекции 'cups' документ с id 'MnQFOwf5V0J70cevDQKS'.
        
        // const cup = database.collection('cups').doc('MnQFOwf5V0J70cevDQKS');
        // cup.get().then(
        //     (resp) => {
        //         console.log(resp.data());
        //     }
        // )

        // Получить все документы

        // database.collection("cups").get().then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // });

        // Получить все документы с условием

        database.collection("cups").where("user", "==", "Volkov")
            .get()
            .then((querySnapshot) => {
                const cups = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    cups.push(doc);
                });
                this.setState({
                    isLoading: false,
                    cups
                })
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        // Настравиаем realtime обновления https://firebase.google.com/docs/firestore/query-data/listen

        database.collection("cups").where("user", "==", "Volkov")
            .onSnapshot((querySnapshot) => {
                const cups = [];
                querySnapshot.forEach(function(doc) {
                    cups.push(doc);
                });
                this.setState({
                    cups
                })
            });
    }

    handleRemoveButtonClick = (event) => {
        const docId = event.target.dataset.id;

        // Удаление записи https://firebase.google.com/docs/firestore/manage-data/delete-data 

        database.collection("cups").doc(docId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        // TODO: Разобраться как работает this.database.child(cupId).remove();
        // https://github.com/wesdoyle/react-firebase-notes-app/blob/master/src/App.js
    }

    handleAddButtonClick = (event) => {
        // Добавление записи https://firebase.google.com/docs/firestore/manage-data/add-data (with a generated id)

        database.collection("cups").add({
            user: "Volkov",
            datetime: new Date()
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }   

    render () {
        const {isLoading, cups} = this.state;        

        return (
            isLoading ? <span>Идёт загрузка ...</span> : 
            <div>
                <ul>
                    {    
                        cups.map((doc) => {
                            const data = doc.data();
                            
                            return (
                                <li key={doc.id}>
                                    {`Запись с id ${doc.id} была создана ${data.datetime} пользователем ${data.user}`} 
                                    <Button
                                        data-id={doc.id}
                                        onClick={this.handleRemoveButtonClick}
                                    >
                                        Удалить
                                    </Button>
                                </li>
                            );
                        })
                    }
                </ul>

                <Button
                    onClick={this.handleAddButtonClick}
                >
                    Добавить
                </Button>
            </div>
        )
    }
} 
