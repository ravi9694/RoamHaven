import React from 'react';
import { Link } from 'react-router-dom';
import PlaceImg from './PlaceImg';

const PlaceCard = ({ place }) => {
  return (
    <Link
      to={`/account/places/${place._id}`}
      className="flex flex-col md:flex-row gap-4 bg-slate-100 p-4 my-3 rounded-2xl cursor-pointer hover:bg-slate-200 transition-all"
      key={place._id}
    >
      <div className="flex w-full sm:w-32 sm:h-32 bg-gray-300 shrink-0 ">
        <PlaceImg place={place} />
      </div>
      <div className="text-black">
        <h2 className= "text-lg md:text-xl">{place.title}</h2>
        <p className= "text-sm mt-2 line-clamp-3">{place.description}</p>
      </div>
    </Link>
  );
};

export default PlaceCard;
