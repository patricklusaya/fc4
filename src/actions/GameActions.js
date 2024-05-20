import { SET_SOUND,FETCH_ITEMS_REQUEST,FETCH_ITEMS_SUCCESS,FETCH_ITEMS_FAILURE  } from "./Types";
import firebase from "../../firebaseConfig";
require("firebase/firestore");
import { db } from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const setSound = (sound) => ({
    type: SET_SOUND,
    payload: sound,
  });

  export const fetchItems = () => {
    console.log('fetching');
    return (dispatch) => {
      
      dispatch({ type: FETCH_ITEMS_REQUEST });
      firebase
        .firestore()
        .collection('gameItems')
        // .where('type', '==', 'playerOne')
        .get()
        .then((snapshot) => {
          let items = [];
          if (snapshot.size !== 0) {
            snapshot.forEach((doc) => {
              const item = doc.data();
              
              items.push(item);
            });
  
            dispatch({ type: FETCH_ITEMS_SUCCESS, payload: items });
          }
        })
        .catch((error) => {
         
          dispatch({ type: FETCH_ITEMS_FAILURE, error });
          console.error("Failed to fetch items:", error);
        });
    };
  };

  export const sendRequest = (message,email) =>{

    const requestID = Math.random().toString(36).substring(6).toUpperCase();

    return (dispatch) => {

   firebase.firestore().collection("featureRequest").doc(requestID).set({message,email} , {merge:true})
   .then(()=>{
    console.log('all done')

   })
   .catch((error) =>{
    console.log('error occured', error)
   })
     
     


    }


  }
  


  
  // const fetchData = async () => {
  //   try {
  //     const snapshot = await db.collection('gameItems').get();
  //     const items = [];
  //     snapshot.forEach(doc => {
  //       items.push({ id: doc.id,...doc.data() }); // Assuming each item has an 'id' field
  //     });
  //     dispatch(fetchItemsSuccess(items));
  //   } catch (error) {
  //     console.error("Failed to fetch items:", error);
  //   }
  // }
