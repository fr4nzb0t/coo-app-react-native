import React from 'react';
import { Platform, Alert, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';

function showComingSoon(): void {
  Alert.alert('Coming soon', 'This feature is not yet available.');
}

export default function TabLayout(): React.ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.divider,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Browse',
          headerShown: true,
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.textPrimary,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="pie-chart-outline" size={size} color={color} />
          ),
          tabBarButton: () => (
            <Pressable
              onPress={showComingSoon}
              accessibilityRole="button"
              accessibilityLabel="Portfolio – coming soon"
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="pie-chart-outline" size={24} color={Colors.textTertiary} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          tabBarButton: () => (
            <Pressable
              onPress={showComingSoon}
              accessibilityRole="button"
              accessibilityLabel="Profile – coming soon"
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="person-circle-outline" size={24} color={Colors.textTertiary} />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
