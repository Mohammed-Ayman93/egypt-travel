import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { type Vendor, type Trip } from '../types';
import { Icon } from '../components/Icon';

const VendorCard: React.FC<{ vendor: Vendor; tripCount: number }> = ({ vendor, tripCount }) => (
    <a href={`#/vendors/${vendor.id}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
        <img src={vendor.logo} alt={`${vendor.name} logo`} className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 mb-4" />
        <h3 className="text-xl font-bold text-gray-800">{vendor.name}</h3>
        <div className="flex items-center text-yellow-500 mt-1">
            <Icon name="star" className="w-5 h-5" />
            <span className="ml-1 font-semibold">{vendor.rating}</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm flex-grow">{vendor.description}</p>
        <div className="mt-4 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {tripCount} Trips Offered
        </div>
        <div className="mt-4 text-blue-600 font-semibold">View Profile &rarr;</div>
    </a>
);


const VendorsListPage: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [vendorsData, tripsData] = await Promise.all([
                api.getVendors(),
                api.getTrips()
            ]);
            setVendors(vendorsData);
            setTrips(tripsData);
            setLoading(false);
        }
        loadData();
    }, []);
    
    const vendorTripCounts = useMemo(() => {
        const counts = new Map<string, number>();
        trips.forEach(trip => {
            counts.set(trip.vendorId, (counts.get(trip.vendorId) || 0) + 1);
        });
        return counts;
    }, [trips]);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Our Partner Companies</h1>
            <p className="text-lg text-gray-600 text-center mb-10">Trusted and professional tour operators across Egypt.</p>
            {loading ? (
                <div className="text-center">Loading companies...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vendors.map(vendor => (
                        <VendorCard key={vendor.id} vendor={vendor} tripCount={vendorTripCounts.get(vendor.id) || 0} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorsListPage;
