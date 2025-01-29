import { Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function CollectionLayout() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      router.replace('/(tabs)/collection');
    }, [])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    />
  );
}
