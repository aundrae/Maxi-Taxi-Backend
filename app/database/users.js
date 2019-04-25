const firebase=require('firebase')
require('firebase/firestore')

const db=firebase.firestore();
const settings={};
db.settings(settings);

function UsersAccounts(name){
    const refNotes=db.collection(name)

    return{
        addUser: data=>{
            docRef= db.collection(name).doc()
            const newItem={
                ...data,
                id:docRef.id
            }
            return docRef.set(newItem,{merge:true}).then(()=>{
                return newItem
            })
        },

        getDriverInfo: plate=>{
            return refNotes.get().then(querySnapshot=>{
                arr=[]
                querySnapshot.forEach(doc=>{
                    temp=doc.data()
                    if(temp.plate==plate)
                        arr.push(temp)
                })
                return arr[0]
            })
        }
    }
}
module.exports=UsersAccounts