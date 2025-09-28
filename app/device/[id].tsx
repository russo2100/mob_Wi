
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useDevices } from '../../hooks/useDevices';
import { IconSymbol } from '../../components/IconSymbol';

export default function DeviceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { devices, toggleDevice, updateDeviceProperty } = useDevices();
  
  const device = devices.find(d => d.id === id);

  if (!device) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>Устройство не найдено</Text>
      </View>
    );
  }

  const isOn = device.properties?.isOn || false;
  const isOnline = device.status === 'online';

  const handleToggle = () => {
    console.log('Toggle device:', device.name);
    if (isOnline) {
      toggleDevice(device.id);
    }
  };

  const handleBrightnessChange = (value: number) => {
    console.log('Brightness changed:', value);
    updateDeviceProperty(device.id, 'brightness', value);
  };

  const handleTemperatureChange = (value: number) => {
    console.log('Temperature changed:', value);
    updateDeviceProperty(device.id, 'temperature', value);
  };

  const renderControls = () => {
    switch (device.type) {
      case 'light':
        return (
          <View style={styles.controlsContainer}>
            <Text style={styles.controlLabel}>Яркость</Text>
            <View style={styles.sliderContainer}>
              {[20, 40, 60, 80, 100].map((value) => (
                <Pressable
                  key={value}
                  style={[
                    styles.sliderButton,
                    {
                      backgroundColor: 
                        device.properties?.brightness === value 
                          ? colors.accent 
                          : colors.backgroundAlt
                    }
                  ]}
                  onPress={() => handleBrightnessChange(value)}
                >
                  <Text style={styles.sliderButtonText}>{value}%</Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      
      case 'thermostat':
      case 'air_conditioner':
        return (
          <View style={styles.controlsContainer}>
            <Text style={styles.controlLabel}>Температура</Text>
            <View style={styles.sliderContainer}>
              {[18, 20, 22, 24, 26].map((value) => (
                <Pressable
                  key={value}
                  style={[
                    styles.sliderButton,
                    {
                      backgroundColor: 
                        device.properties?.temperature === value 
                          ? colors.accent 
                          : colors.backgroundAlt
                    }
                  ]}
                  onPress={() => handleTemperatureChange(value)}
                >
                  <Text style={styles.sliderButtonText}>{value}°C</Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen
        options={{
          title: device.name,
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
        <View style={styles.deviceHeader}>
          <View style={styles.deviceIconContainer}>
            <Text style={styles.deviceIcon}>{device.icon}</Text>
          </View>
          
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.roomName}>{device.room}</Text>
          
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isOnline ? colors.accent : colors.grey }
              ]}
            />
            <Text style={styles.statusText}>
              {isOnline ? 'Онлайн' : 'Офлайн'}
            </Text>
          </View>
        </View>

        <View style={styles.mainControl}>
          <Pressable
            style={[
              styles.powerButton,
              {
                backgroundColor: isOn && isOnline ? colors.accent : colors.backgroundAlt,
                opacity: isOnline ? 1 : 0.5
              }
            ]}
            onPress={handleToggle}
            disabled={!isOnline}
          >
            <IconSymbol 
              name="power" 
              size={32} 
              color={isOn && isOnline ? colors.background : colors.text} 
            />
            <Text style={[
              styles.powerButtonText,
              { color: isOn && isOnline ? colors.background : colors.text }
            ]}>
              {isOn ? 'ВЫКЛЮЧИТЬ' : 'ВКЛЮЧИТЬ'}
            </Text>
          </Pressable>
        </View>

        {isOnline && isOn && renderControls()}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Информация об устройстве</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Тип:</Text>
            <Text style={styles.infoValue}>{device.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Статус:</Text>
            <Text style={styles.infoValue}>
              {isOnline ? 'Подключено' : 'Не подключено'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Комната:</Text>
            <Text style={styles.infoValue}>{device.room}</Text>
          </View>
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
  deviceHeader: {
    alignItems: 'center',
    padding: 32,
  },
  deviceIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceIcon: {
    fontSize: 40,
  },
  deviceName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  roomName: {
    fontSize: 16,
    color: colors.grey,
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: colors.grey,
  },
  mainControl: {
    padding: 20,
    alignItems: 'center',
  },
  powerButton: {
    width: 200,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  powerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  controlsContainer: {
    padding: 20,
  },
  controlLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  sliderButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  infoSection: {
    padding: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey + '30',
  },
  infoLabel: {
    fontSize: 16,
    color: colors.grey,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});
