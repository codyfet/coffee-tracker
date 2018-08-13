import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from "react-bootstrap";
import {database} from './Config/config.js';
import {deleteCupById, addCup, listenCupsByUser, getAllCupsForUser} from './Servcies/CupsServices.js';

export class Tracker extends React.Component {
    state = {
        isLoading: true,
        cups: []
    }

    componentDidMount () {
        /**
         * Грузим все чашки для текущего пользователя.
         */
        getAllCupsForUser("Volkov")
            .then(
                (querySnapshot) => {
                    const cups = [];
                    querySnapshot.forEach((doc) => {
                        cups.push(doc);
                    });
                    this.setState({
                        isLoading: false,
                        cups
                    })
                }
            )
            .catch(
                (error) => {
                    console.log("Error getting documents: ", error);
                }
            );            

        /**
         * Подписываемся на обновления коллекции cups для текущего пользователя.
         */
        listenCupsByUser("Volkov", (querySnapshot) => {
            const cups = [];
            querySnapshot.forEach(function(doc) {
                cups.push(doc);
            });
            this.setState({cups})
        });
    }

    /**
     * Обработчик нажатия на кнопку "Удалить".
     */
    handleRemoveButtonClick = (event) => {
        const docId = event.target.dataset.id;
        /**
         * Удаляем чашку по docId.
         */ 
        deleteCupById(docId)
            .then(
                (result) => {
                    console.log("Document successfully deleted!");
                }
            )
            .catch(
                (error) => {
                    console.error("Error removing document: ", error);
                }
            );
    }

    /**
     * Обработчик нажатия на кнопку "Добавить".
     */
    handleAddButtonClick = (event) => {
        /**
         * Создаём новую чашку.
         */
        const newCup = {
            user: "Volkov",
            datetime: new Date()
        }
        /**
         * Добавляем новый документ в коллекцию cups/
         */
        addCup(newCup)
            .then(
                (docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                }
            )
            .catch(
                (error) => {
                    console.error("Error adding document: ", error);
                }
            );
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
