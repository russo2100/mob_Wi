
import { useState, useEffect } from 'react';
import { Device, Room } from '../types/Device';

// Mock data for demonstration
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Гостиная свет',
    type: 'light',
    status: 'online',
    room: 'Гостиная',
    icon: '💡',
    color: '#FFD700',
    properties: { isOn: true, brightness: 80 }
  },
  {
    id: '2',
    name: 'Термостат',
    type: 'thermostat',
    status: 'online',
    room: 'Гостиная',
    icon: '🌡️',
    color: '#FF6B6B',
    properties: { temperature: 22, isOn: true }
  },
  {
    id: '3',
    name: 'Спальня свет',
    type: 'light',
    status: 'offline',
    room: 'Спальня',
    icon: '💡',
    color: '#4ECDC4',
    properties: { isOn: false, brightness: 0 }
  },
  {
    id: '4',
    name: 'ТВ Samsung',
    type: 'tv',
    status: 'online',
    room: 'Гостиная',
    icon: '📺',
    color: '#45B7D1',
    properties: { isOn: false, volume: 25 }
  },
  {
    id: '5',
    name: 'Кондиционер',
    type: 'air_conditioner',
    status: 'online',
    room: 'Спальня',
    icon: '❄️',
    color: '#96CEB4',
    properties: { isOn: true, temperature: 24 }
  },
  {
    id: '6',
    name: 'Умная розетка',
    type: 'outlet',
    status: 'online',
    room: 'Кухня',
    icon: '🔌',
    color: '#FFEAA7',
    properties: { isOn: true }
  }
];

const mockRooms: Room[] = [
  { id: '1', name: 'Гостиная', icon: '🛋️', deviceCount: 3 },
  { id: '2', name: 'Спальня', icon: '🛏️', deviceCount: 2 },
  { id: '3', name: 'Кухня', icon: '🍳', deviceCount: 1 },
  { id: '4', name: 'Ванная', icon: '🚿', deviceCount: 0 }
];

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [loading, setLoading] = useState(false);

  const toggleDevice = (deviceId: string) => {
    console.log('Toggling device:', deviceId);
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId
          ? {
              ...device,
              properties: {
                ...device.properties,
                isOn: !device.properties?.isOn
              }
            }
          : device
      )
    );
  };

  const updateDeviceProperty = (deviceId: string, property: string, value: any) => {
    console.log('Updating device property:', deviceId, property, value);
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId
          ? {
              ...device,
              properties: {
                ...device.properties,
                [property]: value
              }
            }
          : device
      )
    );
  };

  const getDevicesByRoom = (roomName: string) => {
    return devices.filter(device => device.room === roomName);
  };

  const getOnlineDevicesCount = () => {
    return devices.filter(device => device.status === 'online').length;
  };

  const refreshDevices = async () => {
    setLoading(true);
    console.log('Refreshing devices...');
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      console.log('Devices refreshed');
    }, 1000);
  };

  return {
    devices,
    rooms,
    loading,
    toggleDevice,
    updateDeviceProperty,
    getDevicesByRoom,
    getOnlineDevicesCount,
    refreshDevices
  };
};
