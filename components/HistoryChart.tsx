
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SensorDataPoint } from '../types';

interface HistoryChartProps {
  data: SensorDataPoint[];
  dataKey: keyof SensorDataPoint;
  name: string;
  color: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-700/80 p-3 rounded-md border border-slate-600 shadow-lg">
                <p className="label text-gray-300">{`${new Date(label).toLocaleString('vi-VN')}`}</p>
                <p className="intro" style={{ color: payload[0].color }}>
                    {`${payload[0].name} : ${payload[0].value.toFixed(2)}`}
                </p>
            </div>
        );
    }
    return null;
};

const HistoryChart: React.FC<HistoryChartProps> = ({ data, dataKey, name, color }) => {
  const formattedData = data.map(d => ({
    ...d,
    timestamp: new Date(d.timestamp).getTime(),
    [dataKey]: typeof d[dataKey] === 'number' ? parseFloat((d[dataKey] as number).toFixed(2)) : 0
  }));

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg h-80">
      <h3 className="text-lg font-semibold text-white mb-4">{name}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#9ca3af"
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
            type="number"
            domain={['dataMin', 'dataMax']}
            />
          <YAxis stroke="#9ca3af" domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey={dataKey} name={name} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
