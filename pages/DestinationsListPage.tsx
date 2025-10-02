import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { type Destination, type Trip } from '../types';

const DestinationsListPage: React.FC = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [data, tripsData] = await Promise.all([
                api.getDestinations(),
                api.getTrips()
            ]);
            setDestinations(data);
            setTrips(tripsData);
            setLoading(false);
        }
        loadData();
    }, []);

    const destinationTripCounts = useMemo(() => {
        const counts = new Map<string, number>();
        trips.forEach(trip => {
            counts.set(trip.destinationId, (counts.get(trip.destinationId) || 0) + 1);
        });
        return counts;
    }, [trips]);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Explore Destinations</h1>
            <p className="text-lg text-gray-600 text-center mb-10">From ancient wonders to modern marvels, find your next stop.</p>
            {loading ? (
                <div className="text-center">Loading destinations...</div>
            ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {destinations.map(dest => (
                        <a href={`#/destinations/${dest.id}`} key={dest.id} className="relative rounded-lg overflow-hidden h-96 group shadow-lg">
                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <h3 className="text-4xl font-extrabold tracking-wider">{dest.name}</h3>
                                <p className="mt-2 text-gray-200 max-w-md hidden sm:block">{dest.description}</p>
                                <div className="mt-4 bg-orange-500 text-white font-bold py-1 px-3 rounded-full inline-block">
                                    {destinationTripCounts.get(dest.id) || 0} Tours Available
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DestinationsListPage;
