
import React, { useState, useMemo } from 'react';
import HistoryChart from './HistoryChart';
import { SensorLocation, SensorDataPoint } from '../types';

interface HistoryViewProps {
  sensors: SensorLocation[];
  historicalData: { [key: string]: SensorDataPoint[] };
}

const HistoryView: React.FC<HistoryViewProps> = ({ sensors, historicalData }) => {
  const [selectedSensorId, setSelectedSensorId] = useState<string>(sensors[0].id);

  const sensorHistory = useMemo(() =>
    historicalData[selectedSensorId] || [],
    [historicalData, selectedSensorId]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Lịch sử Dữ liệu</h2>
        <div className="bg-slate-800 rounded-md">
          <select
            value={selectedSensorId}
            onChange={(e) => setSelectedSensorId(e.target.value)}
            className="bg-transparent text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {sensors.map(sensor => (
              <option key={sensor.id} value={sensor.id} className="bg-slate-800">{sensor.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HistoryChart data={sensorHistory} dataKey="ph" name="Độ pH" color="#38bdf8" />
        <HistoryChart data={sensorHistory} dataKey="temperature" name="Nhiệt độ (°C)" color="#f59e0b" />
        <HistoryChart data={sensorHistory} dataKey="turbidity" name="Độ đục (NTU)" color="#a16207" />
        <HistoryChart data={sensorHistory} dataKey="dissolvedOxygen" name="Oxy hòa tan (mg/L)" color="#10b981" />
      </div>
    </div>
  );
};

export default HistoryView;
