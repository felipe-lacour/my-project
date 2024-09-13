import { useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from 'firebase/firestore';


export function usePartidas (){
  const [list, setList] = useState([])
  useEffect(() => {
    const db = getFirestore()
    
    const refCollection = collection(db, 'partidas')
    getDocs(refCollection).then(snapshot => {
      if(snapshot.size === 0) console.log('no results')
      else {
        const newList = snapshot.docs.map(doc => {
          return { id: doc.id, data: doc.data() }
        })
        setList(newList)
      }
    })
  }, [])
  return list
}