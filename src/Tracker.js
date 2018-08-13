import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import { database } from './Config/config.js';
import { deleteCupById, addCup, listenCupsByUser, getAllCupsForUser } from './Servcies/CupsServices.js';
import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import { CoffeeIcon } from './Components/CoffeeIcon.js';

export class Tracker extends React.Component {
    state = {
        isLoading: true,
        cups: [],
        selectedDay: new Date()
    }

    componentDidMount() {
        /**
         * Грузим все чашки для текущего пользователя.
         */
        getAllCupsForUser("Volkov")
            .then(
                (querySnapshot) => {
                    const cups = [];
                    /**
                     * Идём по массиву QueryDocumentSnapshot'ов и на каждой итерации извлекаем данные документа.
                     * И кладём их в стейт.
                     */
                    querySnapshot.forEach((doc) => {
                        cups.push(Object.assign({}, doc.data(), {id: doc.id})); // TODO: Убрать костыль. 
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
            /**
             * Идём по массиву QueryDocumentSnapshot'ов и на каждой итерации извлекаем данные документа.
             * И кладём их в стейт.
             */
            querySnapshot.forEach(
                (doc) => {
                    cups.push(Object.assign({}, doc.data(), {id: doc.id}));
                }
            );
            this.setState({cups})
        });
    }

    /**
     * Обработчик нажатия на кнопку "Удалить".
     */
    handleRemoveButtonClick = (event) => {
        const docId = event.target.id;
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
         * Datetime заполняем выбранным в календаре значением.
         */
        const newCup = {
            user: "Volkov",
            datetime: this.state.selectedDay
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

    /**
     * Обработчик выбора значения в datepicker.
     * @param {*} day 
     */
    handleDayClick = (day) => {
        this.setState({
            selectedDay: day
        });
    }

    // render () {
    //     const {isLoading, cups} = this.state;        

    //     return (
    //         isLoading ? <span>Идёт загрузка ...</span> : 
    //         <div>
    //             <ul>
    //                 {    
    //                     cups.map((doc) => {
    //                         const data = doc.data();

    //                         return (
    //                             <li key={doc.id}>
    //                                 {`Запись с id ${doc.id} была создана ${data.datetime} пользователем ${data.user}`} 
    //                                 <Button
    //                                     data-id={doc.id}
    //                                     onClick={this.handleRemoveButtonClick}
    //                                 >
    //                                     Удалить
    //                                 </Button>
    //                             </li>
    //                         );
    //                     })
    //                 }
    //             </ul>

    //             <Button
    //                 onClick={this.handleAddButtonClick}
    //             >
    //                 Добавить
    //             </Button>
    //         </div>
    //     )
    // }

    render () {
        const {cups, selectedDay} = this.state;
        const today = new Date();
        const coffeeItems = [];
       
        cups.forEach(
            (cup) => {
                if (cup.datetime.setHours(0, 0, 0, 0) === selectedDay.setHours(0, 0, 0, 0)) {
                    coffeeItems.push(
                        <CoffeeIcon 
                            height="30"
                            width="30"
                            id={cup.id} // TODO: Вот тут надо переделать, это не работает.
                            onClick={this.handleRemoveButtonClick}
                        />
                    );
                }
            }
        )

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={3} className="text-center">
                        <DayPicker
                            onDayClick={this.handleDayClick}
                            selectedDays={this.state.selectedDay}
                        />
                        {
                            this.state.selectedDay
                                ? <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
                                : <p>Please select a day.</p>
                        }
                        <Button onClick={this.handleAddButtonClick}>+1</Button>

                        <br /><br />
                        
                        <div>{coffeeItems}</div>
                    </Col>
                </Row>
            </Grid>
        );
    }
} 
