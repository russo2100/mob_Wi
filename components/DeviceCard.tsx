
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Device } from '../types/Device';
import { colors } from '../styles/commonStyles';
import { router } from 'expo-router';

interface DeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle }) => {
  const isOn = device.properties?.isOn || false;
  const isOnline = device.status === 'online';

  const handlePress = () => {
    console.log('Device card pressed:', device.name);
    router.push(`/device/${device.id}`);
  };

  const handleToggle = (e: any) => {
    e.stopPropagation();
    console.log('Toggle pressed for device:', device.name);
    if (isOnline) {
      onToggle(device.id);
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: isOnline ? colors.backgroundAlt : colors.background }
      ]}
      onPress={handlePress}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{device.icon}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnline ? colors.accent : colors.grey }
            ]}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.roomName}>{device.room}</Text>
        
        {device.type === 'thermostat' && device.properties?.temperature && (
          <Text style={styles.property}>
            {device.properties.temperature}°C
          </Text>
        )}
        
        {device.type === 'light' && device.properties?.brightness && (
          <Text style={styles.property}>
            {device.properties.brightness}%
          </Text>
        )}
      </View>

      <Pressable
        style={[
          styles.toggleButton,
          {
            backgroundColor: isOn && isOnline ? colors.accent : colors.grey,
            opacity: isOnline ? 1 : 0.5
          }
        ]}
        onPress={handleToggle}
        disabled={!isOnline}
      >
        <Text style={styles.toggleText}>
          {isOn ? 'ВКЛ' : 'ВЫКЛ'}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.grey + '30',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    marginBottom: 16,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  roomName: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 8,
  },
  property: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.accent,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.background,
  },
});
