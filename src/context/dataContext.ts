import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { toAccountDet} from '../Models'

export const DataContext = React.createContext({});

export function useAuthInit2<Any>(props) {
    const [data, setData] = useState({
        data: {},
      });
    
      useEffect(() => {
        const entryRef = firestore
          .collection("users")
          .doc(props.userId)
        entryRef.get().then((doc) => {
          setData(toAccountDet(doc));
        });
      }, [props.userId]);

      console.log(data)

      return data
};