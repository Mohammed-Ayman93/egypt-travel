
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api';
import { type Trip, type Vendor, type Destination, type Vehicle, type TripBatch, VehicleType } from '../types';
import { Icon } from '../components/Icon';
import { SeatPicker } from '../components/SeatPicker';
import { useNavigate } from 'react-router-dom';

interface TripDetailsPageProps {
  tripId: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const TripDetailsPage: React.FC<TripDetailsPageProps> = ({ tripId }) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Booking State
  const [passengers, setPassengers] = useState(1);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<'seats' | 'vehicle'>('seats');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const tripData = await api.getTripById(tripId);
        if (tripData) {
          setTrip(tripData);
          const [vendorData, destData, vehiclesData] = await Promise.all([
            api.getVendorById(tripData.vendorId),
            api.getDestinationById(tripData.destinationId),
            api.getVehicles()
          ]);
          setVendor(vendorData || null);
          setDestination(destData || null);
          setVehicles(vehiclesData);
          if (tripData.availableBatches.length > 0) {
            setSelectedBatchId(tripData.availableBatches[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to load trip details:", error);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadData();
  }, [tripId]);

  const selectedBatch = useMemo(() => {
    return trip?.availableBatches.find(b => b.id === selectedBatchId);
  }, [trip, selectedBatchId]);

  const selectedVehicle = useMemo(() => {
    return vehicles.find(v => v.id === selectedBatch?.vehicleId);
  }, [vehicles, selectedBatch]);

  const availableBatches = useMemo(() => {
    if (!trip || !vehicles.length) return [];
    return trip.availableBatches.filter(batch => {
      const vehicle = vehicles.find(v => v.id === batch.vehicleId);
      if (!vehicle) return false;
      return vehicle.capacity - batch.bookedSeats.length >= passengers;
    });
  }, [trip, vehicles, passengers]);

  useEffect(() => {
    if (availableBatches.length > 0 && !availableBatches.find(b => b.id === selectedBatchId)) {
        setSelectedBatchId(availableBatches[0].id);
    } else if (availableBatches.length === 0) {
        setSelectedBatchId(null);
    }
  }, [availableBatches, selectedBatchId]);

  const handleSeatSelect = useCallback((seatNumber: number) => {
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  }, []);

  const { totalPrice, isBookingReady } = useMemo(() => {
    if (!selectedBatch || !selectedVehicle) return { totalPrice: 0, isBookingReady: false };
    
    if (bookingType === 'vehicle') {
        return { totalPrice: selectedVehicle.fullVehiclePrice, isBookingReady: true };
    }

    const price = selectedVehicle.pricePerSeat * selectedSeats.length;
    const ready = selectedSeats.length === passengers;
    return { totalPrice: price, isBookingReady: ready };

  }, [selectedBatch, selectedVehicle, bookingType, selectedSeats, passengers]);

  const handleBooking = () => {
    if (!isBookingReady || !trip || !selectedBatch || !selectedVehicle) return;
    const bookingDetails = {
        trip: trip,
        batch: selectedBatch,
        passengers: bookingType === 'vehicle' ? selectedVehicle.capacity : passengers,
        isFullVehicle: bookingType === 'vehicle',
        selectedSeats: bookingType === 'vehicle' ? [] : selectedSeats,
        totalPrice: totalPrice
    };
    
    // In a real app, this would probably go through a checkout process
    // For now, we simulate and navigate to confirmation
    api.submitBooking(bookingDetails).then(result => {
        if(result.success) {
            navigate('/confirmation', { state: { bookingDetails, bookingId: result.bookingId } });
        }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (!trip || !vendor || !destination) return <div className="text-center py-20">Trip not found.</div>;

  const getVehicleIcon = (type: VehicleType) => {
    if (type === VehicleType.CAR) return 'car';
    if (type === VehicleType.MICROBUS || type === VehicleType.BUS) return 'bus';
    return 'users';
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">{trip.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
          <div className="flex items-center"><Icon name="location" className="w-5 h-5 mr-2 text-blue-500" />{destination.name}</div>
          <div className="flex items-center"><Icon name="calendar" className="w-5 h-5 mr-2 text-blue-500" />{trip.durationDays} Days</div>
          <div className="flex items-center text-yellow-500"><Icon name="star" className="w-5 h-5 mr-1" /> <span className="font-bold">{trip.rating}</span></div>
          <span>By <a href={`#/vendors/${vendor.id}`} className="text-blue-600 hover:underline font-semibold">{vendor.name}</a></span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Trip Info */}
        <div className="lg:col-span-2">
          <img src={trip.images[0]} alt={trip.title} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-200 pb-2">About the Trip</h2>
          <p className="text-gray-700 leading-relaxed mb-8">{trip.description}</p>
          
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-200 pb-2">Itinerary</h2>
          <div className="space-y-4">
            {trip.itinerary.map(item => (
              <div key={item.day} className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold mr-4">
                  {item.day}
                </div>
                <div>
                  <h4 className="font-bold text-lg">Day {item.day}</h4>
                  <p className="text-gray-600">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Booking */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-28 border">
            <h2 className="text-2xl font-bold mb-4 text-center">Book Your Spot</h2>
            
            {/* Passengers */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">How many passengers?</label>
              <input 
                type="number" 
                min="1" 
                value={passengers} 
                onChange={e => {
                    setPassengers(Math.max(1, parseInt(e.target.value, 10)));
                    setSelectedSeats([]);
                }}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Batch Selection */}
            {availableBatches.length > 0 ? (
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Select a date:</label>
                    <select value={selectedBatchId || ''} onChange={e => setSelectedBatchId(e.target.value)} className="w-full p-2 border rounded-md">
                        {availableBatches.map(batch => (
                            <option key={batch.id} value={batch.id}>
                                {new Date(batch.date).toDateString()} - {vehicles.find(v => v.id === batch.vehicleId)?.type}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-center">No available trips for {passengers} passenger(s). Please try a smaller group.</div>
            )}
            
            {selectedBatch && selectedVehicle && (
              <>
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <div className="font-bold flex items-center gap-2"><Icon name={getVehicleIcon(selectedVehicle.type)} className="w-5 h-5" />{selectedVehicle.type}</div>
                  <div className="text-sm text-gray-600">Capacity: {selectedVehicle.capacity} | Available: {selectedVehicle.capacity - selectedBatch.bookedSeats.length}</div>
                </div>

                {/* Booking Type */}
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <button onClick={() => { setBookingType('seats'); setSelectedSeats([]); }} className={`p-3 rounded-md text-center font-semibold border-2 ${bookingType === 'seats' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>Book Seats</button>
                  <button onClick={() => { setBookingType('vehicle'); setSelectedSeats([]); }} className={`p-3 rounded-md text-center font-semibold border-2 ${bookingType === 'vehicle' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>Book Vehicle</button>
                </div>

                {bookingType === 'seats' && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Select Your {passengers} Seat(s)</h4>
                    <SeatPicker 
                        vehicle={selectedVehicle}
                        bookedSeats={selectedBatch.bookedSeats}
                        selectedSeats={selectedSeats}
                        onSeatSelect={handleSeatSelect}
                        maxSeats={passengers}
                    />
                  </div>
                )}
                
                {bookingType === 'vehicle' && (
                  <div className="mb-4 bg-green-100 p-3 rounded-md text-green-800">
                    <p className="font-bold">Full Vehicle Discount Applied!</p>
                    <p>Enjoy the entire {selectedVehicle.type.toLowerCase()} for your group.</p>
                  </div>
                )}

                {/* Price & Book Button */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center text-2xl font-bold mb-4">
                    <span>Total:</span>
                    <span>EGP {totalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={!isBookingReady} 
                    className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg text-lg hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Book Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsPage;
