"use client"
import { TiStarFullOutline } from "react-icons/ti";

const Rating = ({rating}) => {
  const star = Array(rating).fill("star");
  const noStar = Array(5 - rating).fill("star");
  return (
    <div className="w-fit flex">
      {noStar.map((s , index)=> {
        return <TiStarFullOutline key={index} size={25} className="text-gray-500"/>
      })}

      {star.map((s , index)=> {
        return <TiStarFullOutline key={index} size={25} className="text-warning"/>
      })}

    </div>
  );
}
 
export default Rating;