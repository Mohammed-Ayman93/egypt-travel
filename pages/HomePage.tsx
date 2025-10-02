import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { type Trip, type Destination } from '../types';
import { TripCard } from '../components/TripCard';
import { Icon } from '../components/Icon';

const HomePage: React.FC = () => {
  const [featuredTrips, setFeaturedTrips] = useState<Trip[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [tripsData, destsData] = await Promise.all([
        api.getTrips(),
        api.getDestinations(),
      ]);
      setFeaturedTrips(tripsData.slice(0, 3));
      setDestinations(destsData.slice(0, 4));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1600/900')" }}>
        <div className="bg-black bg-opacity-50 p-12 text-center rounded-lg">
          <h1 className="text-5xl font-extrabold mb-4">Discover the Soul of Egypt</h1>
          <p className="text-xl mb-8">Unforgettable journeys, curated for you.</p>
           <a href="#/trips" className="bg-orange-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 text-lg">
              Explore Trips
          </a>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Trips</h2>
        {loading ? (
          <div className="text-center">Loading trips...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </section>
      
      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Why Travel With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-4 rounded-full">
                           <Icon name="shield-check" className="w-10 h-10 text-blue-600" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Verified Partners</h3>
                    <p className="text-gray-600">We partner with the best and most reputable tour operators in Egypt to ensure your safety and satisfaction.</p>
                </div>
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-orange-100 p-4 rounded-full">
                            <Icon name="tag" className="w-10 h-10 text-orange-500" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Unbeatable Prices</h3>
                    <p className="text-gray-600">We work directly with providers to cut out middle-men and offer you the best possible prices on all our trips.</p>
                </div>
                <div className="p-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 p-4 rounded-full">
                            <Icon name="chat" className="w-10 h-10 text-green-600" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Our dedicated support team is available around the clock to assist you with any questions or concerns.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map(dest => (
              <a href={`#/destinations/${dest.id}`} key={dest.id} className="relative rounded-lg overflow-hidden h-80 group">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                  <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
