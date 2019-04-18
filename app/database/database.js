const firebase=require('firebase');
require('firebase/firestore')

var config = {
    apiKey: "AIzaSyDkUHXPIpLCx9G6cMbrdE9h7nKyGlx9HhI",
    authDomain: "express-demo-54676.firebaseapp.com",
    databaseURL: "https://express-demo-54676.firebaseio.com",
    projectId: "express-demo-54676",
    storageBucket: "express-demo-54676.appspot.com",
    messagingSenderId: "157079182412"
  };
firebase.initializeApp(config);
const db=firebase.firestore();
const settings={};
db.settings(settings);

function TransactionsDatabase(name){
    const refNotes=db.collection(name)

    return{
        getName: () => name,

        all: () =>{
            return refNotes.get().then(querySnapshot =>{
                const arr =[]
                querySnapshot.forEach(doc=>{
                    arr.push(doc.data())
                })
                return arr
            })
        },

        findByDriverName: name =>{
            return refNotes.get().then(querySnapshot=>{
                const arr=[]
                querySnapshot.forEach(doc=>{
                    temp=doc.data()
                    if(temp.name==name)
                    arr.push(temp)
                })
                return arr
            })
        },
        
        addTransaction: transaction =>{
            docRef= db.collection(name).doc()
            const newItem={
                ...transaction,
                id:docRef.id
            }
            return docRef.set(newItem,{merge:true}).then(()=>{
                return newItem
            })
        }
    }
}
module.exports=TransactionsDatabase