
import React, { useState, useEffect } from 'react';
import { type Trip, type Destination, type Vendor } from '../types';
import { api } from '../services/api';
import { Icon } from './Icon';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dest = await api.getDestinationById(trip.destinationId);
      const vend = await api.getVendorById(trip.vendorId);
      setDestination(dest || null);
      setVendor(vend || null);
    };
    fetchData();
  }, [trip.destinationId, trip.vendorId]);

  return (
    <a href={`#/trips/${trip.id}`} className="block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={trip.images[0]} alt={trip.title} />
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg font-bold">
          {trip.durationDays} Days
        </div>
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs">
          By {vendor?.name || '...'}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500 flex items-center">
                <Icon name="location" className="w-4 h-4 mr-1 text-blue-500" />
                {destination?.name || '...'}
            </p>
            <div className="flex items-center text-yellow-500">
                <Icon name="star" className="w-5 h-5" />
                <span className="ml-1 font-bold">{trip.rating}</span>
            </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{trip.title}</h3>
        <p className="text-xl font-bold text-blue-600 mt-2">
          EGP {trip.basePrice.toLocaleString()}
          <span className="text-sm font-normal text-gray-500"> / person</span>
        </p>
      </div>
    </a>
  );
};
