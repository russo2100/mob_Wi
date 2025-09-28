
import React from 'react';
import { Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '../../styles/commonStyles';
import { IconSymbol } from '../../components/IconSymbol';

export default function AppIndexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Умный дом',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerRight: () => (
            <Pressable
              onPress={() => {
                console.log('Settings button pressed');
                router.push('/settings');
              }}
              style={{ padding: 8 }}
            >
              <IconSymbol name="gear" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
