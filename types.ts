
export enum WaterQualityStatus {
  GOOD = 'Tốt',
  MODERATE = 'Trung bình',
  POOR = 'Kém',
  DANGEROUS = 'Nguy hiểm'
}

export interface SensorDataPoint {
  timestamp: string;
  ph: number;
  temperature: number; // Celsius
  turbidity: number; // NTU
  dissolvedOxygen: number; // mg/L
}

export interface SensorLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: WaterQualityStatus;
  latestData: SensorDataPoint;
}

export interface Alert {
  id: string;
  sensorId: string;
  sensorName: string;
  parameter: string;
  value: number;
  threshold: number;
  timestamp: string;
  severity: 'warning' | 'critical';
}

export interface AiChatMessage {
  role: 'user' | 'model' | 'error';
  content: string;
}
