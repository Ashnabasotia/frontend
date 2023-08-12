import React, {useState, useEffect, useMemo } from 'react'
import Store from "./components/store/store"
export default function App() {
  
  console.log("There is a reload");

  const [allData,setallData] = useState({});

  useEffect(()=>{
    console.log("Hello useEffect")
    const fetchData =  async() => {
      const response = await fetch("http://localhost:5000/stores");
      const storeData = await response.json();
      setallData({...storeData});
    }
    fetchData();
  },[])
  
  const formatData = useMemo (() =>
  {
    const data = allData?.data;
    const included = allData?.included;

    const countries = included?.filter((obj) => (obj.type === "countries"));
    const books = included?.filter((obj) => (obj.type === "books")).sort((a,b) => (b?.attributes?.copiesSold - a?.attributes?.copiesSold));
    const authors = included?.filter((obj) => (obj.type === "authors"));

    const tempStoresInfo = data?.map((store) => {

      const currStoreBooks = store?.relationships?.books?.data;
      const bestSellers = books?.filter((book) => (currStoreBooks?.filter((currBook) => (book.id === currBook.id)).length > 0))?.slice(0,2);
      const country = countries?.filter((country) => country.id === store?.relationships?.countries?.data?.id)
      const bestAuthors = authors?.filter((author) => ((bestSellers)?.filter((bestSeller) => (bestSeller?.relationships?.author?.data?.id === author?.id)).length > 0))
    
      return {
          id : store.id,
          ...store.attributes,
          country : country[0]?.attributes?.code,
          books: bestSellers,
          authors : bestAuthors
      }  
    })
   return tempStoresInfo;
  },[allData])

  return (
    <>
      {
        formatData?.map((storeData) => {
          return (
            <Store storeImg={storeData?.storeImage}
                   storeName={storeData?.name}
                   rating={storeData?.rating}
                   bestSellingBooks={storeData?.books}
                   bestSellingAuthors={storeData?.authors}
                   country={storeData?.country}
                   date={storeData?.establishmentDate}
                   website={storeData?.website}

                        />
          )
        })
      }
    </>
  )
}
