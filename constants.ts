
import { SensorLocation, Alert, SensorDataPoint, WaterQualityStatus } from './types';

const generateHistoricalData = (): SensorDataPoint[] => {
  const data: SensorDataPoint[] = [];
  const now = new Date();
  for (let i = 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000).toISOString();
    data.push({
      timestamp,
      ph: 6.5 + Math.random() * 1.5, // 6.5 - 8.0
      temperature: 20 + Math.random() * 10, // 20 - 30
      turbidity: Math.random() * 50, // 0 - 50
      dissolvedOxygen: 5 + Math.random() * 5, // 5 - 10
    });
  }
  return data;
};

export const SENSOR_LOCATIONS: SensorLocation[] = [
  {
    id: 'sensor-01',
    name: 'Hồ Tây - Trạm 1',
    latitude: 21.056,
    longitude: 105.817,
    status: WaterQualityStatus.GOOD,
    latestData: {
      timestamp: new Date().toISOString(),
      ph: 7.2,
      temperature: 26.5,
      turbidity: 5.1,
      dissolvedOxygen: 8.5,
    },
  },
  {
    id: 'sensor-02',
    name: 'Sông Tô Lịch - Cầu Giấy',
    latitude: 21.028,
    longitude: 105.795,
    status: WaterQualityStatus.POOR,
    latestData: {
      timestamp: new Date().toISOString(),
      ph: 6.1,
      temperature: 29.1,
      turbidity: 150.3,
      dissolvedOxygen: 2.3,
    },
  },
  {
    id: 'sensor-03',
    name: 'Hồ Hoàn Kiếm',
    latitude: 21.028,
    longitude: 105.852,
    status: WaterQualityStatus.MODERATE,
    latestData: {
      timestamp: new Date().toISOString(),
      ph: 7.8,
      temperature: 27.2,
      turbidity: 25.7,
      dissolvedOxygen: 6.8,
    },
  },
];

export const HISTORICAL_DATA: { [key: string]: SensorDataPoint[] } = {
  'sensor-01': generateHistoricalData(),
  'sensor-02': generateHistoricalData().map(d => ({ ...d, ph: d.ph - 1, turbidity: d.turbidity * 3, dissolvedOxygen: d.dissolvedOxygen - 3 })),
  'sensor-03': generateHistoricalData().map(d => ({ ...d, turbidity: d.turbidity * 1.5 })),
};

export const ALERTS: Alert[] = [
  {
    id: 'alert-01',
    sensorId: 'sensor-02',
    sensorName: 'Sông Tô Lịch - Cầu Giấy',
    parameter: 'Oxy hòa tan',
    value: 2.3,
    threshold: 4.0,
    timestamp: new Date(new Date().getTime() - 15 * 60000).toISOString(),
    severity: 'critical',
  },
  {
    id: 'alert-02',
    sensorId: 'sensor-02',
    sensorName: 'Sông Tô Lịch - Cầu Giấy',
    parameter: 'Độ đục',
    value: 150.3,
    threshold: 100,
    timestamp: new Date(new Date().getTime() - 15 * 60000).toISOString(),
    severity: 'critical',
  },
  {
    id: 'alert-03',
    sensorId: 'sensor-03',
    sensorName: 'Hồ Hoàn Kiếm',
    parameter: 'Độ đục',
    value: 25.7,
    threshold: 25,
    timestamp: new Date(new Date().getTime() - 2 * 60 * 60000).toISOString(),
    severity: 'warning',
  },
];
