import React from 'react'
import {Star} from './star'
import './store.css'


function calculateRating(rating)
{
    let finalRating = [];
    for(let i=0; i<rating; i++)
    {
        finalRating.push(<Star/>);
    }
    return finalRating;
}

function displayBookData(bestSellingBooks,bestSellingAuthors)
{
    if(bestSellingBooks?.length > 0)
    {
        return (
            <>
                {bestSellingBooks?.map((book,index) =>  {
                    return(
                    <tr>
                        <td>
                            {book?.attributes?.name}
                        </td>
                        <td>
                            {bestSellingAuthors[index]?.attributes?.fullName}
                        </td>
                    </tr>
                        
                    )
                })}
            </>
        )
    }
    else{
        return <tr><td>No data available</td></tr>
    }
} 

function findFlag(country)
{
    return (<><img src={`https://flagcdn.com/48x36/${country}.png`} alt={country} /></>)
}


export default function Store({storeImg, storeName, rating , bestSellingBooks, bestSellingAuthors ,country, date, website }) {



  return (
    <div className="MainWrapper">
        <div className="SubWrapper">
            <div className="SubWrapperLeft">
                <img src={storeImg} alt={storeName}></img>
            </div>
            <div className="SubWrapperRight">
                <div className="NameRatingWrapper">
                    <div className="NameWrapper">
                        {storeName}
                    </div>
                    <div className="ratingWrapper">
                       {calculateRating(rating)}
                    </div>
                </div>
                <div className="BooksTable">
                    <table>
                        <tr>
                        <th>
                            Best Selling Books
                        </th>
                        </tr>
                        {
                           displayBookData(bestSellingBooks,bestSellingAuthors)
                        }
                    </table>
                </div>
                </div>
            </div>
            <div className="footerInfo">
                    <div className="dateAndWebsite">
                        <div className="date">
                            {date.substring(0,10)}
                        </div>
                        <div className="website">
                            {website}
                        </div>
                    </div>
                    
                    <div className="Flag">
                        {findFlag(country.toLowerCase())}
                    </div>
        </div>
    </div>
  )
}
