import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const userDataApi = createApi({
    reducerPath: 'userDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://magic-aliexpress1.p.rapidapi.com' }),
    endpoints: (builder) => ({
        // bestSalesByNewest: builder.query({
        //     query: (count) => createRequest(`/api/bestSales/SortedByNewest?limit=${count}`)
        // }),
        userData: builder.query({
            query: (userId) => {
                const docRef = doc(db, 'usersData', userId)
                const docSnap = getDoc(docRef)
            }
        })
    })
})

// const docRef = doc(db, 'usersData', user)
//         const docSnap = await getDoc(docRef)
//         if (docSnap.exists()) {
//             // console.log("Document data:", docSnap.data().wishList);
//             setWishList(docSnap.data().wishList)
//         } else {
//             // console.log("No such document!");
//             setWishList([])
//         }

export const { useUserDataQuery } = userDataApi;