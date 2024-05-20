import React, { useRef, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { Audio } from 'expo-av';


const { width, height } = Dimensions.get('window');
const audioFiles = {
  enter:require("../../../../assets/sounds/enter.mp3"),
};

export default function PlayerTwoModal({ isVisible, onClose, onOptionSelect, modalOptions }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const modalRef = useRef(null);

  const onCloseModal = (selectedItems) => {

    if (selectedItems.length < 1) {
        return alert("You must select 6 items")
      } else {
        onClose(selectedItems)
      }
    
  }

  const handleOptionSelect = async(item) => {
    let updatedSelectedItems;
    
    if (selectedItems.includes(item)) {
      updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
    } else {
      updatedSelectedItems = [...selectedItems, item];
      
    }

    if (updatedSelectedItems.length <= 6) {

      setSelectedItems(updatedSelectedItems);
    onOptionSelect(updatedSelectedItems);
    console.log('selected', updatedSelectedItems)
      
    } else{
     alert("You can only do 6 selections")
    }

    const newSound = await Audio.Sound.createAsync(audioFiles.enter, { shouldPlay: true });
  
    await newSound.playAsync();
    


  };

  const renderButton = ({ item }) => (
    <TouchableOpacity
      key={item}
      onPress={() => handleOptionSelect(item)}
      style={[styles.touchableButton, selectedItems.includes(item) && styles.selectedButton]}
    >
      <Text style={styles.modalOption}>{item.itemName}</Text>
    </TouchableOpacity>
  );

  const numColumns = Math.floor(width / 100); // Adjust 100 based on button width

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={() => {}} >
      
      <TouchableOpacity style={styles.overlay} activeOpacity={1}  >
        
        <View style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => onCloseModal(selectedItems)}>
              <View style={styles.modalCloseButton}>
                <Text style={styles.modalOptionClose}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={modalOptions}
            renderItem={renderButton}
            keyExtractor={(item) => item.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    marginTop: height / 4,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  modalHeader: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    padding: 7,
    margin: 5,
    borderRadius: 15,
    width: (width - 40) / 3, // Adjust 40 based on modal padding
    backgroundColor: '#4b4bc8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  modalOption: {
    fontSize: 15,
    fontFamily:'myriadBold',
    color: 'white',
  },
  modalOptionClose: {
    fontSize: 20,
    fontFamily:'myriadBold',
    color: 'black',
  },
  modalCloseButton:{

    marginVertical:10

  },
  flatListContainer: {
    flexGrow: 1,
    marginTop: 25,
  },
});
