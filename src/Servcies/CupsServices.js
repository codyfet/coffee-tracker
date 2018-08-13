import {database} from '../Config/config.js';

/**
 * Удаляет документ в коллекцию cups по docId.
 * Подробнее https://firebase.google.com/docs/firestore/manage-data/delete-data 
 * 
 * @param {string} docId Идентификатор документа.
 * 
 * @returns {Promise}
 */    
export function deleteCupById (docId) {
    return database.collection("cups").doc(docId).delete();

    // TODO: Разобраться как работает this.database.child(cupId).remove();
    // https://github.com/wesdoyle/react-firebase-notes-app/blob/master/src/App.js
}

/**
 * Возвращает документ из коллекции cups по его docId.
 * 
 * @param {string} docId Идентификатор документа.
 * 
 * @returns {Promise}
 */
export function getCupById (docId) {
    return database.collection('cups').doc(docId).get();
        // .then(
        //     (resp) => {
        //         console.log(resp.data());
        //     }
        // )
}

/**
 * Добавляет новый документ в коллекцию cups.
 * Подробнее https://firebase.google.com/docs/firestore/manage-data/add-data (with a generated id)
 * 
 * @param {string} docId Идентификатор документа.
 * 
 * @returns {Promise}
 */    
export function addCup (newCup) {
    return database.collection("cups").add(newCup);
}

/**
 * Возвращает все документы из коллекции cups для определённого пользователя.
 * 
 * @param {string} user Имя пользователя (атрибут user в документе cup).
 * 
 * @returns {Promise}
 */  
export function getAllCupsForUser (user) {
    return database.collection("cups").where("user", "==", user).get();
}

/**
 * Возвращает все документы из коллекции cups.
 * 
 * @returns {Promise}
 */  
export function getAllCups () {
    return database.collection("cups").get();
        // .then(
        //     (querySnapshot) => {
        //         querySnapshot.forEach(function(doc) {
        //             console.log(doc.id, " => ", doc.data());
        //         });
        //     }
        // );
}

/**
 * Настравиаем realtime обновления https://firebase.google.com/docs/firestore/query-data/listen
 * 
 * @param {string} user Имя пользователя.
 * @param {Function} callback Функция, которую необходимо вызвать после обновления.
 */
export function listenCupsByUser (user, callback) {
    return database.collection("cups").where("user", "==", user).onSnapshot(callback);
}