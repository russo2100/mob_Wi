
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  room: string;
  icon: string;
  color: string;
  properties?: DeviceProperties;
}

export type DeviceType = 
  | 'light'
  | 'thermostat'
  | 'fan'
  | 'tv'
  | 'speaker'
  | 'camera'
  | 'lock'
  | 'outlet'
  | 'blinds'
  | 'air_conditioner';

export type DeviceStatus = 'online' | 'offline' | 'connecting';

export interface DeviceProperties {
  brightness?: number;
  temperature?: number;
  volume?: number;
  speed?: number;
  isOn?: boolean;
  isLocked?: boolean;
  position?: number;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
}
