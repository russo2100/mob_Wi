
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useDevices } from '../../hooks/useDevices';
import { DeviceCard } from '../../components/DeviceCard';
import { IconSymbol } from '../../components/IconSymbol';

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { rooms, getDevicesByRoom, toggleDevice } = useDevices();
  
  const room = rooms.find(r => r.id === id);
  const roomDevices = room ? getDevicesByRoom(room.name) : [];

  if (!room) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>Комната не найдена</Text>
      </View>
    );
  }

  const onlineDevices = roomDevices.filter(device => device.status === 'online');
  const activeDevices = roomDevices.filter(device => device.properties?.isOn);

  const handleToggleAllDevices = () => {
    console.log('Toggle all devices in room:', room.name);
    onlineDevices.forEach(device => {
      toggleDevice(device.id);
    });
  };

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen
        options={{
          title: room.name,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={styles.container}>
        <View style={styles.roomHeader}>
          <View style={styles.roomIconContainer}>
            <Text style={styles.roomIcon}>{room.icon}</Text>
          </View>
          
          <Text style={styles.roomName}>{room.name}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{roomDevices.length}</Text>
              <Text style={styles.statLabel}>Устройств</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{onlineDevices.length}</Text>
              <Text style={styles.statLabel}>Онлайн</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{activeDevices.length}</Text>
              <Text style={styles.statLabel}>Активных</Text>
            </View>
          </View>
        </View>

        {onlineDevices.length > 0 && (
          <View style={styles.controlSection}>
            <Pressable
              style={styles.toggleAllButton}
              onPress={handleToggleAllDevices}
            >
              <IconSymbol name="power" size={20} color={colors.background} />
              <Text style={styles.toggleAllText}>
                Переключить все устройства
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.devicesSection}>
          <Text style={styles.sectionTitle}>Устройства в комнате</Text>
          {roomDevices.length > 0 ? (
            roomDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onToggle={toggleDevice}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📱</Text>
              <Text style={styles.emptyStateText}>
                В этой комнате пока нет устройств
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Добавьте устройства для управления ими
              </Text>
            </View>
          )}
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
  backButton: {
    padding: 8,
  },
  roomHeader: {
    alignItems: 'center',
    padding: 32,
  },
  roomIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roomIcon: {
    fontSize: 40,
  },
  roomName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grey,
  },
  controlSection: {
    padding: 20,
  },
  toggleAllButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    marginLeft: 8,
  },
  devicesSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
  },
});
