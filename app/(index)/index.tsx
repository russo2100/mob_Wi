
import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useDevices } from '../../hooks/useDevices';
import { DeviceCard } from '../../components/DeviceCard';
import { RoomCard } from '../../components/RoomCard';
import { QuickActions } from '../../components/QuickActions';
import { NetworkStatus } from '../../components/NetworkStatus';

export default function HomeScreen() {
  const {
    devices,
    rooms,
    loading,
    toggleDevice,
    getOnlineDevicesCount,
    refreshDevices
  } = useDevices();

  const handleToggleAllLights = () => {
    console.log('Toggle all lights');
    const lightDevices = devices.filter(device => device.type === 'light');
    lightDevices.forEach(device => {
      if (device.status === 'online') {
        toggleDevice(device.id);
      }
    });
  };

  const handleSetComfortMode = () => {
    console.log('Set comfort mode');
    // Set all devices to comfort settings
    devices.forEach(device => {
      if (device.status === 'online') {
        switch (device.type) {
          case 'thermostat':
          case 'air_conditioner':
            // Set comfortable temperature
            break;
          case 'light':
            // Set comfortable brightness
            break;
        }
      }
    });
  };

  const handleLockAll = () => {
    console.log('Lock all devices');
    // Turn off all devices for security
    devices.forEach(device => {
      if (device.status === 'online' && device.properties?.isOn) {
        toggleDevice(device.id);
      }
    });
  };

  return (
    <View style={commonStyles.wrapper}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshDevices}
            tintColor={colors.accent}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Добро пожаловать домой</Text>
          <Text style={styles.statusText}>
            {getOnlineDevicesCount()} из {devices.length} устройств онлайн
          </Text>
        </View>

        <NetworkStatus />

        <QuickActions
          onToggleAllLights={handleToggleAllLights}
          onSetComfortMode={handleSetComfortMode}
          onLockAll={handleLockAll}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Комнаты</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.roomsContainer}
          >
            {rooms.map((room) => (
              <View key={room.id} style={styles.roomCardWrapper}>
                <RoomCard room={room} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Устройства</Text>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={toggleDevice}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: colors.grey,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  roomsContainer: {
    paddingHorizontal: 8,
  },
  roomCardWrapper: {
    width: 140,
  },
});
