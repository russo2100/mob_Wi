
import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/commonStyles';

interface QuickAction {
  id: string;
  name: string;
  icon: string;
  action: () => void;
}

interface QuickActionsProps {
  onToggleAllLights: () => void;
  onSetComfortMode: () => void;
  onLockAll: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onToggleAllLights,
  onSetComfortMode,
  onLockAll,
}) => {
  const quickActions: QuickAction[] = [
    {
      id: '1',
      name: 'Весь свет',
      icon: '💡',
      action: onToggleAllLights,
    },
    {
      id: '2',
      name: 'Комфорт',
      icon: '🏠',
      action: onSetComfortMode,
    },
    {
      id: '3',
      name: 'Заблокировать',
      icon: '🔒',
      action: onLockAll,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Быстрые действия</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickActions.map((action) => (
          <Pressable
            key={action.id}
            style={styles.actionButton}
            onPress={() => {
              console.log('Quick action pressed:', action.name);
              action.action();
            }}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionName}>{action.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  actionButton: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    minHeight: 80,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionName: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
});
