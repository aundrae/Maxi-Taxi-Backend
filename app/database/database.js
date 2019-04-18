const firebase=require('firebase');
require('firebase/firestore')

var config = {
    apiKey: "AIzaSyAvpNOm0tP6GDSxprXijvOmQBhco32MDFw",
    authDomain: "maxi-taxi-c2eae.firebaseapp.com",
    databaseURL: "https://maxi-taxi-c2eae.firebaseio.com",
    projectId: "maxi-taxi-c2eae",
    storageBucket: "maxi-taxi-c2eae.appspot.com",
    messagingSenderId: "433591686426"
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