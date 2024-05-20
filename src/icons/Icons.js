// CustomBackButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const BackIcon = ({ navigation }) => {
 return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <Text style={styles.text}>Go Back</Text>
    </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
 button: {
    padding: 10,
    // Add any custom styles for your back button here
 },
 text: {
    fontSize: 16,
    // Add any custom styles for your text here
 },
});

export default BackIcon;
