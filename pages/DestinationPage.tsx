
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { type Destination, type Trip } from '../types';
import { TripCard } from '../components/TripCard';

interface DestinationPageProps {
  destinationId: string;
}

const DestinationPage: React.FC<DestinationPageProps> = ({ destinationId }) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [destData, tripsData] = await Promise.all([
        api.getDestinationById(destinationId),
        api.getTripsByDestinationId(destinationId),
      ]);
      setDestination(destData || null);
      setTrips(tripsData);
      setLoading(false);
    };
    loadData();
  }, [destinationId]);

  if (loading) return <div className="text-center py-20">Loading destination...</div>;
  if (!destination) return <div className="text-center py-20">Destination not found.</div>;

  return (
    <div>
      {/* Destination Hero */}
      <section className="h-[50vh] bg-cover bg-center flex items-end text-white" style={{ backgroundImage: `url(${destination.image})` }}>
        <div className="w-full bg-gradient-to-t from-black to-transparent p-12">
          <h1 className="text-5xl font-extrabold">{destination.name}</h1>
          <p className="text-xl mt-2 max-w-3xl">{destination.description}</p>
        </div>
      </section>

      {/* Trips to this destination */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Tours in {destination.name}</h2>
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">There are currently no scheduled trips to this destination.</p>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
