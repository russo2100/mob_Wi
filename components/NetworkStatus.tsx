
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkState } from 'expo-network';
import { colors } from '../styles/commonStyles';

export const NetworkStatus: React.FC = () => {
  const networkState = useNetworkState();

  if (!networkState.isConnected) {
    return (
      <View style={styles.container}>
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineIcon}>📶</Text>
          <Text style={styles.offlineText}>Нет подключения к сети</Text>
        </View>
      </View>
    );
  }

  if (networkState.type === 'WIFI') {
    return (
      <View style={styles.container}>
        <View style={styles.onlineContainer}>
          <Text style={styles.onlineIcon}>📶</Text>
          <Text style={styles.onlineText}>Подключено к Wi-Fi</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.warningContainer}>
        <Text style={styles.warningIcon}>📱</Text>
        <Text style={styles.warningText}>Мобильная сеть - подключитесь к Wi-Fi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  onlineContainer: {
    backgroundColor: colors.accent + '20',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineContainer: {
    backgroundColor: '#FF6B6B20',
    borderColor: '#FF6B6B',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningContainer: {
    backgroundColor: '#FFD93D20',
    borderColor: '#FFD93D',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  offlineIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  onlineText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '500',
  },
  offlineText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  warningText: {
    fontSize: 14,
    color: '#FFD93D',
    fontWeight: '500',
  },
});
