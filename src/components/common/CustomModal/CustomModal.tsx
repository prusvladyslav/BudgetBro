import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSave: () => void;
  isAllowedSave: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, children, onSave, isAllowedSave }) => {
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingBottom: '20%'
    },
    modalContainer: {
      backgroundColor: '#202020',
      borderRadius: 10,
      padding: 20,
      width: '90%'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    closeButton: {
      fontSize: 20,
      marginTop: 10,
      color: isAllowedSave ? 'grey' : 'orange',
    },
    saveButton: {
      fontSize: 20,
      marginTop: 10,
      color: isAllowedSave ? 'orange' : 'grey',
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {children}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!isAllowedSave} onPress={onSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
