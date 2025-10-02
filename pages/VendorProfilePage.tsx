
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { type Vendor, type Trip } from '../types';
import { TripCard } from '../components/TripCard';
import { Icon } from '../components/Icon';

interface VendorProfilePageProps {
  vendorId: string;
}

const VendorProfilePage: React.FC<VendorProfilePageProps> = ({ vendorId }) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [vendorData, tripsData] = await Promise.all([
        api.getVendorById(vendorId),
        api.getTripsByVendorId(vendorId),
      ]);
      setVendor(vendorData || null);
      setTrips(tripsData);
      setLoading(false);
    };
    loadData();
  }, [vendorId]);

  if (loading) return <div className="text-center py-20">Loading company profile...</div>;
  if (!vendor) return <div className="text-center py-20">Company not found.</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Vendor Header */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12 flex flex-col md:flex-row items-center gap-8">
        <img src={vendor.logo} alt={`${vendor.name} logo`} className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{vendor.name}</h1>
          <div className="flex items-center text-yellow-500 mt-2">
            <Icon name="star" className="w-6 h-6" />
            <span className="ml-1 text-xl font-bold">{vendor.rating}</span>
            <span className="ml-2 text-gray-500 text-base">Average Rating</span>
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl">{vendor.description}</p>
        </div>
      </div>

      {/* Trips by this vendor */}
      <h2 className="text-3xl font-bold mb-8">Trips by {vendor.name}</h2>
      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">This company has no upcoming trips.</p>
      )}
    </div>
  );
};

export default VendorProfilePage;
