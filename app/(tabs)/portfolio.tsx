import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

export default function PortfolioScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Portfolio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.headingLarge,
    color: Colors.textSecondary,
  },
});
