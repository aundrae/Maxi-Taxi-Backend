require('../keys')
const firebase=require('firebase');
require('firebase/firestore')

const db=firebase.firestore();
const settings={};
db.settings(settings);

function Users(name){
    const refNotes=db.collection(name)

    return{
        findByUID: name =>{
            return refNotes.get().then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    temp=doc.data()
                    if(temp.name==name)
                        return temp
                })
                return null
            })
        },
        addUser: data =>{
            docRef= db.collection(name).doc()
            const newItem={
                ...data,
                id:docRef.id
            }
            return docRef.set(newItem,{merge:true}).then(()=>{
                return newItem
            })
        }
    }
}