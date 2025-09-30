import React from 'react';
import { WaterQualityStatus } from '../types';

// FIX: Changed icon type from React.ReactElement to JSX.Element. This resolves an issue where React.cloneElement couldn't add a 'className' prop because the element's props were being inferred as 'unknown'.
interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  status: WaterQualityStatus;
  icon: JSX.Element;
}

const statusColors: { [key in WaterQualityStatus]: { bg: string; text: string; border: string } } = {
  [WaterQualityStatus.GOOD]: { bg: 'bg-emerald-900/50', text: 'text-emerald-300', border: 'border-emerald-500' },
  [WaterQualityStatus.MODERATE]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500' },
  [WaterQualityStatus.POOR]: { bg: 'bg-orange-900/50', text: 'text-orange-300', border: 'border-orange-500' },
  [WaterQualityStatus.DANGEROUS]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500' },
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, status, icon }) => {
  const colors = statusColors[status] || statusColors[WaterQualityStatus.MODERATE];

  return (
    <div className={`bg-slate-800 p-4 rounded-lg shadow-lg border-l-4 ${colors.border} flex items-start`}>
        <div className={`mr-4 p-3 rounded-full ${colors.bg}`}>
           {React.cloneElement(icon, { className: `w-6 h-6 ${colors.text}` })}
        </div>
        <div>
          <p className="text-sm text-gray-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-white">
            {value} <span className="text-lg font-normal text-gray-400">{unit}</span>
          </p>
          <p className={`text-sm font-semibold ${colors.text}`}>{status}</p>
        </div>
    </div>
  );
};

export default MetricCard;