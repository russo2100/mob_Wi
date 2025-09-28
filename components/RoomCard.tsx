
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Room } from '../types/Device';
import { colors } from '../styles/commonStyles';
import { router } from 'expo-router';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const handlePress = () => {
    console.log('Room card pressed:', room.name);
    router.push(`/room/${room.id}`);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{room.icon}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.roomName}>{room.name}</Text>
        <Text style={styles.deviceCount}>
          {room.deviceCount} устройств
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.grey + '30',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    alignItems: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  deviceCount: {
    fontSize: 12,
    color: colors.grey,
  },
});
