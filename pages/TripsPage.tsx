import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { type Trip, type Destination } from '../types';
import { TripCard } from '../components/TripCard';

const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDestination, setFilterDestination] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [priceRange, setPriceRange] = useState<number>(10000);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [tripsData, destsData] = await Promise.all([
        api.getTrips(),
        api.getDestinations(),
      ]);
      setTrips(tripsData);
      setDestinations(destsData);
      if (tripsData.length > 0) {
        const max = Math.ceil(Math.max(...tripsData.map(t => t.basePrice)) / 100) * 100;
        setMaxPrice(max);
        setPriceRange(max);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredAndSortedTrips = useMemo(() => {
    let result = trips;

    if (filterDestination !== 'all') {
      result = result.filter(trip => trip.destinationId === filterDestination);
    }
    
    result = result.filter(trip => trip.basePrice <= priceRange);

    if (filterDuration !== 'all') {
        const [min, max] = filterDuration.split('-').map(Number);
        result = result.filter(trip => {
            if (max) {
                return trip.durationDays >= min && trip.durationDays <= max;
            }
            return trip.durationDays >= min;
        });
    }

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.basePrice - a.basePrice);
    }

    return result;
  }, [trips, filterDestination, sortBy, priceRange, filterDuration]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Explore Our Trips</h1>
      <p className="text-lg text-gray-600 text-center mb-8">Find the perfect adventure tailored just for you.</p>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row flex-wrap gap-6 items-center justify-center">
        <div className="flex items-center gap-2">
          <label htmlFor="destination-filter" className="font-semibold">Destination:</label>
          <select
            id="destination-filter"
            value={filterDestination}
            onChange={(e) => setFilterDestination(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="all">All</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="font-semibold">Sort By:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="rating">Rating</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
         <div className="flex items-center gap-2">
            <label htmlFor="duration-filter" className="font-semibold">Duration:</label>
            <select 
                id="duration-filter" 
                value={filterDuration} 
                onChange={(e) => setFilterDuration(e.target.value)}
                className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
                <option value="all">All</option>
                <option value="1-1">1 Day</option>
                <option value="2-4">2-4 Days</option>
                <option value="5-7">5-7 Days</option>
                <option value="8-999">8+ Days</option>
            </select>
        </div>
         <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[250px]">
            <div className="w-full flex justify-between">
                <label className="font-semibold">Max Price:</label>
                <span className="font-bold text-blue-600">EGP {priceRange.toLocaleString()}</span>
            </div>
            <input
                type="range"
                min="500"
                max={maxPrice}
                step="100"
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
                className="w-full"
            />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading trips...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedTrips.length > 0 ? (
            filteredAndSortedTrips.map(trip => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <p className="col-span-full text-center text-gray-500 py-8">No trips match the current filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
