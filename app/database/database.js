const firebase=require('firebase');
require('firebase/firestore')

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

        findByDriverPlate: name =>{
            return refNotes.get().then(querySnapshot=>{
                const arr=[]
                querySnapshot.forEach(doc=>{
                    temp=doc.data()
                    if(temp.transInfo.driverID==name)
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