import React, { useEffect, useState } from 'react';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axiosInstance from '../utils/axios';

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(1500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      setTitle(place.title);
      setAddress(place.address);
      setAddedPhotos(place.photos);
      setDesc(place.description);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setPrice(place.price);
      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-slate-100 text-sm">{description}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update existing place
      const { data } = await axiosInstance.put('/places/update-place', {
        id,
        ...placeData,
      });
    } else {
      // new place
      const { data } = await axiosInstance.post(
        '/places/add-places',
        placeData
      );
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          'Title',
          'title for your place. Should be short and catchy as in advertisement'
        )}
        <input
          type="text"
          className='bg-slate-200 text-black'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My lovely apt"
        />

        {preInput('Address', 'Address to this place')}
        <input
          value={address}
          className='bg-slate-200 text-black'
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="address"
        />

        {preInput('Photos', 'more = better')}

        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput('Description', 'description of the place')}
        <textarea className='bg-slate-200 text-black' value={desc} onChange={(e) => setDesc(e.target.value)} />

        {preInput('Perks', ' select all the perks of your place')}
        <Perks selected={perks} onChange={setPerks} />

        {preInput('Extra info', 'house rules, etc ')}
        <textarea
        className='bg-slate-200 text-black'
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          'Check in&out times',
          'add check in and out times, remember to have some time window forcleaning the room between guests. '
        )}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              className='bg-slate-200 text-black'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              className='bg-slate-200 text-black'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max no. of guests</h3>
            <input
              type="text"
              className='bg-slate-200 text-black'
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="text"
              value={price}
              className='bg-slate-200 text-black'
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1"
            />
          </div>
        </div>
        <button className="mx-auto my-4 flex bg-primary text-white py-3 px-20 rounded-full font-semibold text-xl">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
