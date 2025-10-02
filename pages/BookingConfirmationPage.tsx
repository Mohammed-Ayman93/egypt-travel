
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '../components/Icon';

const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { bookingDetails, bookingId } = location.state || {};

  if (!bookingDetails || !bookingId) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">Booking Details Not Found</h1>
        <p className="mt-4 text-gray-600">There was an error retrieving your booking information. Please return to the homepage.</p>
        <a href="/" className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Go Home
        </a>
      </div>
    );
  }

  const { trip, batch, passengers, isFullVehicle, selectedSeats, totalPrice } = bookingDetails;

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-10">
            <div className="inline-block bg-green-100 p-4 rounded-full">
                <Icon name="check" className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mt-4">Booking Confirmed!</h1>
            <p className="text-gray-600 text-lg mt-2">Your adventure is just around the corner.</p>
            <p className="font-semibold text-gray-800 mt-4">Booking ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{bookingId}</span></p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{trip.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Date:</strong> {new Date(batch.date).toDateString()}</p>
              <p><strong>Duration:</strong> {trip.durationDays} Days</p>
              <p><strong>Passengers:</strong> {passengers}</p>
              <p><strong>Total Price:</strong> <span className="font-bold">EGP {totalPrice.toLocaleString()}</span></p>
            </div>
            {selectedSeats.length > 0 && (
                <p className="mt-4"><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
            )}
            {isFullVehicle && (
                <p className="mt-4 font-bold text-green-700">You have booked the entire vehicle!</p>
            )}
          </div>
          
          <div className="text-center text-gray-600">
            <p className="mb-2">A confirmation email with all your trip details has been sent to your registered address.</p>
            <p>You will also receive a reminder email 24 hours before your trip begins.</p>
          </div>

          <div className="text-center mt-10">
            <a href="/" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Explore More Trips
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
