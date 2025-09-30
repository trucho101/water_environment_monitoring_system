
import React, { useState } from 'react';
import { SensorLocation, WaterQualityStatus } from '../types';

interface MapViewProps {
  sensors: SensorLocation[];
}

const statusStyles: { [key in WaterQualityStatus]: string } = {
  [WaterQualityStatus.GOOD]: 'bg-emerald-500',
  [WaterQualityStatus.MODERATE]: 'bg-yellow-500',
  [WaterQualityStatus.POOR]: 'bg-orange-500',
  [WaterQualityStatus.DANGEROUS]: 'bg-red-500',
};

const MapPin: React.FC<{ sensor: SensorLocation; onClick: (sensor: SensorLocation) => void }> = ({ sensor, onClick }) => {
  // These are approximate pixel positions for Hanoi map
  const getPosition = (lat: number, lon: number) => {
    const top = (21.07 - lat) * 3000;
    const left = (lon - 105.78) * 2000;
    return { top: `${top}%`, left: `${left}%` };
  };

  const position = getPosition(sensor.latitude, sensor.longitude);

  return (
    <button
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ top: position.top, left: position.left }}
      onClick={() => onClick(sensor)}
    >
      <div className={`${statusStyles[sensor.status]} w-4 h-4 rounded-full ring-4 ring-slate-900/50`}></div>
      <div className="absolute top-full mt-2 w-max bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {sensor.name}
      </div>
    </button>
  );
};

const SensorPopup: React.FC<{ sensor: SensorLocation; onClose: () => void }> = ({ sensor, onClose }) => {
    return (
        <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg shadow-2xl w-full max-w-sm border border-slate-700 animate-fade-in-up">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-white">{sensor.name}</h3>
                    <p className={`font-semibold ${statusStyles[sensor.status].replace('bg-', 'text-')}`}>{sensor.status}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400">pH:</span> <span className="font-medium text-white">{sensor.latestData.ph}</span></div>
                <div><span className="text-gray-400">Nhiệt độ:</span> <span className="font-medium text-white">{sensor.latestData.temperature}°C</span></div>
                <div><span className="text-gray-400">Độ đục:</span> <span className="font-medium text-white">{sensor.latestData.turbidity} NTU</span></div>
                <div><span className="text-gray-400">Oxy:</span> <span className="font-medium text-white">{sensor.latestData.dissolvedOxygen} mg/L</span></div>
            </div>
        </div>
    );
};


const MapView: React.FC<MapViewProps> = ({ sensors }) => {
  const [selectedSensor, setSelectedSensor] = useState<SensorLocation | null>(null);

  const handlePinClick = (sensor: SensorLocation) => {
    setSelectedSensor(sensor);
  };
  
  const handleClosePopup = () => {
    setSelectedSensor(null);
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-white mb-4">Bản đồ Trạm Quan Trắc</h2>
      <div className="flex-grow bg-slate-800 rounded-lg shadow-lg relative overflow-hidden group">
        <img
          src="https://picsum.photos/seed/hanoimap/1600/900"
          alt="Bản đồ Hà Nội"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0">
          {sensors.map(sensor => (
            <MapPin key={sensor.id} sensor={sensor} onClick={handlePinClick} />
          ))}
        </div>
        {selectedSensor && <SensorPopup sensor={selectedSensor} onClose={handleClosePopup} />}
      </div>
    </div>
  );
};

export default MapView;
