
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { IconSymbol } from '../components/IconSymbol';

export default function SettingsScreen() {
  const handleWifiSettings = () => {
    console.log('WiFi settings pressed');
    Alert.alert(
      'Настройки Wi-Fi',
      'Здесь вы можете настроить подключение к сети Wi-Fi для управления устройствами.',
      [{ text: 'OK' }]
    );
  };

  const handleAddDevice = () => {
    console.log('Add device pressed');
    Alert.alert(
      'Добавить устройство',
      'Функция добавления новых устройств будет доступна в следующих версиях.',
      [{ text: 'OK' }]
    );
  };

  const handleNotifications = () => {
    console.log('Notifications pressed');
    Alert.alert(
      'Уведомления',
      'Настройте уведомления о состоянии ваших устройств.',
      [{ text: 'OK' }]
    );
  };

  const handleAbout = () => {
    console.log('About pressed');
    Alert.alert(
      'О приложении',
      'Умный дом v1.0\nПриложение для управления устройствами в вашем доме через Wi-Fi сеть.',
      [{ text: 'OK' }]
    );
  };

  const settingsItems = [
    {
      id: '1',
      title: 'Настройки Wi-Fi',
      subtitle: 'Управление сетевым подключением',
      icon: 'wifi',
      onPress: handleWifiSettings,
    },
    {
      id: '2',
      title: 'Добавить устройство',
      subtitle: 'Подключить новое устройство',
      icon: 'plus.circle',
      onPress: handleAddDevice,
    },
    {
      id: '3',
      title: 'Уведомления',
      subtitle: 'Настройки оповещений',
      icon: 'bell',
      onPress: handleNotifications,
    },
    {
      id: '4',
      title: 'О приложении',
      subtitle: 'Информация и версия',
      icon: 'info.circle',
      onPress: handleAbout,
    },
  ];

  return (
    <View style={commonStyles.wrapper}>
      <Stack.Screen
        options={{
          title: 'Настройки',
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Настройки приложения</Text>
          <Text style={styles.headerSubtitle}>
            Управляйте настройками вашего умного дома
          </Text>
        </View>

        <View style={styles.settingsSection}>
          {settingsItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.settingsItem}
              onPress={item.onPress}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIconContainer}>
                  <IconSymbol name={item.icon as any} size={20} color={colors.accent} />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>{item.title}</Text>
                  <Text style={styles.settingsSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={16} color={colors.grey} />
            </Pressable>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Информация</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Это приложение позволяет управлять умными устройствами в вашем доме, 
              подключенными к общей Wi-Fi сети. Убедитесь, что ваше мобильное 
              устройство подключено к той же сети, что и управляемые устройства.
            </Text>
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
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.grey,
  },
  settingsSection: {
    marginTop: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundAlt,
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: colors.grey,
  },
  infoSection: {
    margin: 20,
    marginTop: 40,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
