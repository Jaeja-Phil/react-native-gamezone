import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { globalStyles } from '../styles/Global';
import { MaterialIcons } from '@expo/vector-icons';

import ReviewForm from './ReviewForm';
import Card from '../shared/Card';

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([
    { title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1' },
    { title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2' },
    { title: 'Not So "Final" Fantasy', rating: 3, body: 'lorem ipsum', key: '3' },
  ]);

  const addReview = (review) => {
    review.key = Math.random().toString();
    setReviews((prevState) => {
      return [review, ...prevState];
    });
    setModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Text>Hello modal</Text>
            <MaterialIcons
              name='close'
              size={150}
              onPress={() => setModalOpen(!modalOpen)}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name='add'
        size={24}
        onPress={() => setModalOpen(!modalOpen)}
        style={styles.modalToggle}
      />

      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 100,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
