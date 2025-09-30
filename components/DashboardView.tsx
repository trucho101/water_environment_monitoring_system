
import React, { useState, useMemo } from 'react';
import MetricCard from './MetricCard';
import HistoryChart from './HistoryChart';
import { SensorLocation, Alert, SensorDataPoint, WaterQualityStatus } from '../types';

interface DashboardViewProps {
    sensors: SensorLocation[];
    alerts: Alert[];
    historicalData: { [key: string]: SensorDataPoint[] };
}

const getStatusForValue = (param: keyof SensorDataPoint, value: number): WaterQualityStatus => {
    switch (param) {
        case 'ph':
            if (value >= 6.5 && value <= 8.5) return WaterQualityStatus.GOOD;
            if (value >= 6.0 && value <= 9.0) return WaterQualityStatus.MODERATE;
            return WaterQualityStatus.POOR;
        case 'temperature':
            if (value >= 20 && value <= 30) return WaterQualityStatus.GOOD;
            if (value >= 15 && value <= 35) return WaterQualityStatus.MODERATE;
            return WaterQualityStatus.POOR;
        case 'turbidity':
            if (value <= 25) return WaterQualityStatus.GOOD;
            if (value <= 50) return WaterQualityStatus.MODERATE;
            return WaterQualityStatus.POOR;
        case 'dissolvedOxygen':
            if (value >= 5) return WaterQualityStatus.GOOD;
            if (value >= 3) return WaterQualityStatus.MODERATE;
            return WaterQualityStatus.POOR;
        default:
            return WaterQualityStatus.MODERATE;
    }
}

const DashboardView: React.FC<DashboardViewProps> = ({ sensors, alerts, historicalData }) => {
    const [selectedSensorId, setSelectedSensorId] = useState<string>(sensors[0].id);

    const selectedSensor = useMemo(() => 
        sensors.find(s => s.id === selectedSensorId) || sensors[0], 
    [sensors, selectedSensorId]);

    const sensorHistory = useMemo(() => 
        historicalData[selectedSensorId] || [],
    [historicalData, selectedSensorId]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Bảng điều khiển</h2>
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

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Độ pH" value={selectedSensor.latestData.ph.toFixed(1)} unit="" status={getStatusForValue('ph', selectedSensor.latestData.ph)} icon={<PhIcon />} />
                <MetricCard label="Nhiệt độ" value={selectedSensor.latestData.temperature.toFixed(1)} unit="°C" status={getStatusForValue('temperature', selectedSensor.latestData.temperature)} icon={<TemperatureIcon />} />
                <MetricCard label="Độ đục" value={selectedSensor.latestData.turbidity.toFixed(1)} unit="NTU" status={getStatusForValue('turbidity', selectedSensor.latestData.turbidity)} icon={<TurbidityIcon />} />
                <MetricCard label="Oxy hòa tan" value={selectedSensor.latestData.dissolvedOxygen.toFixed(1)} unit="mg/L" status={getStatusForValue('dissolvedOxygen', selectedSensor.latestData.dissolvedOxygen)} icon={<OxygenIcon />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main History Chart */}
                <div className="lg:col-span-2">
                    <HistoryChart data={sensorHistory} dataKey="ph" name="Lịch sử độ pH (24h)" color="#38bdf8" />
                </div>

                {/* Alerts */}
                <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Cảnh báo gần đây</h3>
                    <ul className="space-y-3 max-h-72 overflow-y-auto">
                        {alerts.map(alert => (
                            <li key={alert.id} className={`flex items-start p-3 rounded-md ${alert.severity === 'critical' ? 'bg-red-900/50' : 'bg-amber-900/50'}`}>
                                <div className={`mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full ${alert.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`}>
                                    <AlertIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{alert.sensorName}</p>
                                    <p className="text-sm text-gray-300">
                                        Chỉ số <span className="font-bold">{alert.parameter}</span> là <span className="font-bold">{alert.value}</span>, vượt ngưỡng {alert.threshold}.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(alert.timestamp).toLocaleString('vi-VN')}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Icons
const PhIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.653.448-1.188 1-1.188s1 .535 1 1.188m0 0v11.825m0-11.825a1 1 0 00-1-1.188h-1.5a1 1 0 00-1 1.188m4.5 0v11.825m0-11.825h-4.5m4.5 0a1 1 0 011 1.188v8.45a1 1 0 01-1 1.188h-1.5a1 1 0 01-1-1.188v-1.18m-5.333-3.542a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" /></svg>;
const TemperatureIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a.75.75 0 01.75.75v16.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 18.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" /></svg>;
const TurbidityIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-3.142 0-6 2.067-6 5.25c0 2.034 1.77 3.75 4 3.75s4-1.716 4-3.75c0-3.183-2.858-5.25-6-5.25zm0 11.25c-3.142 0-6 2.067-6 5.25c0 2.034 1.77 3.75 4 3.75s4-1.716 4-3.75c0-3.183-2.858-5.25-6-5.25z" /></svg>;
const OxygenIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zM8.25 12a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM9.75 16.5a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" /></svg>;
const AlertIcon: React.FC<{ className?: string }> = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>

export default DashboardView;
