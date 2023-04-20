/**
 * this is the service which can reuse for any component need to call those method it contains.
 */
/**
 * here import necessary library need to be used.
 */
import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import * as config from '../../firebaseconfig.js';
import {MessageDTO} from './messageDTO';

/**
 * here is the service decorator which are @Injectable for any component need to inject to them constructor to use.
 * providein means where it can be used. 'root' means from root to any submodule.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * here is the service class, need to export mark at before.
 */
export class FireService {
  firebaseApplication;
  firestore: firebase.firestore.Firestore;

  message: any[] = [];
  // here will get/send data from firestore
  // it need a messageDTO to transmit to json file
  // it also need as array to contain the data read from firestore

  /**
   * this is the constrctor which will invoke when the service instance be created.
   */
  constructor() {
    // this is init the firebase connection when the webpage be init
    this.firebaseApplication = firebase.initializeApp(config.firebaseConfig);
    // this will get the firebase firestore service.
    this.firestore = firebase.firestore();

    // this will get all messages when the webapp init.
    this.getMessage();
  }

  /**
   * this is the method to send a message to firestore
   * @param sendThisMessage
   */
  sendMessage(sendThisMessage: any){
    // convert a message to messageDTO
    let messageDTO: MessageDTO = {
      messageContent: sendThisMessage,
      timestamp: new Date(),
      user: 'John Duo'
    }

    // use the firestore to entry a collection and add a message
    this.firestore.collection('initCollection')
      // it will return a collection reference which is a specific path to go the collection
      .add(messageDTO);
  }

  /**
   * this is a message to get all message from firestore
   */
  getMessage() {
    this.firestore.collection('initCollection')
      // .orderBy(("timestamp")) // notice: if we want to use this, then the firebase needs to create an index set.
      .where("user","==","John Duo")
      .onSnapshot( // onSnapshot is a lisstener which lisening the database
        snapshot => { snapshot
          .docChanges() //it will return the snapshot when last time it be changed
          .forEach(change => {
            if (change.type == "added") {
              this.message // it will add the contain into html file message list(an array)
                .push( // add on record into array
                  {
                    id: change.doc.id, // put id as changed record id
                    data: change.doc.data() //put data as changed record data
                });
            }

            if (change.type == 'modified') {
              const index = this.message.findIndex(document => document.id != change.doc.id);
              this.message[index] =
                {id: change.doc.id, data: change.doc.data()}
            }

            if (change.type == 'removed') {
              this.message = this.message.filter(m => m.id != change.doc.id)
            }
        })
      })
  }

  // async getMessage() {
  //   //promise 类型支持异步回调函数的链式调用
  //   const query =
  //     // the query will contain the result from a database as snapshot
  //     await this.firestore
  //       .collection('initCollection')
  //       .get();
  //
  //   this.message =
  //     query
  //     .docs //is the array which the snapshot will form be.
  //     . map( // map is a js method which can map(or copy) an array to other arry.
  //       m => {
  //         m.data(); // data will take the doc snapshot as an object(json format).
  //       }
  //     )
  // }
}
