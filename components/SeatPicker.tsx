
import React from 'react';
import { Vehicle, VehicleType } from '../types';

interface SeatPickerProps {
  vehicle: Vehicle;
  bookedSeats: number[];
  selectedSeats: number[];
  onSeatSelect: (seatNumber: number) => void;
  maxSeats: number;
}

const Seat: React.FC<{
  number: number;
  isBooked: boolean;
  isSelected: boolean;
  onClick: () => void;
}> = ({ number, isBooked, isSelected, onClick }) => {
  const getSeatColor = () => {
    if (isBooked) return 'bg-gray-400 cursor-not-allowed';
    if (isSelected) return 'bg-orange-500 text-white';
    return 'bg-blue-200 hover:bg-blue-400 cursor-pointer';
  };

  return (
    <div
      onClick={!isBooked ? onClick : undefined}
      className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${getSeatColor()}`}
    >
      {number}
    </div>
  );
};

export const SeatPicker: React.FC<SeatPickerProps> = ({
  vehicle,
  bookedSeats,
  selectedSeats,
  onSeatSelect,
  maxSeats,
}) => {
  const handleSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      onSeatSelect(seatNumber);
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect(seatNumber);
    }
  };

  const renderLayout = () => {
    let columns = 0;
    let seatArrangement: (number | null)[][] = [];
    const seats = Array.from({ length: vehicle.capacity }, (_, i) => i + 1);

    if (vehicle.type === VehicleType.CAR) {
      columns = 3;
      seatArrangement = [
          [1, null, 2],
          [3, 4, null]
      ];
    } else if (vehicle.type === VehicleType.MICROBUS) {
      columns = 4;
      for (let i = 0; i < seats.length; i += columns) {
        seatArrangement.push(seats.slice(i, i + columns));
      }
    } else { // BUS
      columns = 5; // 2 seats, aisle, 2 seats
      const rows = Math.ceil(vehicle.capacity / 4);
      for(let i=0; i < rows; i++) {
        const row = [i*4+1, i*4+2, null, i*4+3, i*4+4].filter(s => s === null || s <= vehicle.capacity);
        seatArrangement.push(row);
      }
    }

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <div className="mb-4 text-center text-sm text-gray-600 font-semibold">FRONT</div>
            <div className="flex flex-col items-center space-y-2">
            {seatArrangement.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                {row.map((seatNumber, seatIndex) =>
                    seatNumber ? (
                    <Seat
                        key={seatNumber}
                        number={seatNumber}
                        isBooked={bookedSeats.includes(seatNumber)}
                        isSelected={selectedSeats.includes(seatNumber)}
                        onClick={() => handleSelect(seatNumber)}
                    />
                    ) : (
                    <div key={`aisle-${rowIndex}-${seatIndex}`} className="w-10 h-10"></div>
                    )
                )}
                </div>
            ))}
            </div>
             <div className="mt-6 flex justify-center space-x-4 text-sm">
                <div className="flex items-center"><div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>Available</div>
                <div className="flex items-center"><div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>Selected</div>
                <div className="flex items-center"><div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>Booked</div>
            </div>
        </div>
    );
  };
  
  return renderLayout();
};
