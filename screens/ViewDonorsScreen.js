import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppMainLayout from '../layouts/AppMainLayout';
import {Picker} from '@react-native-community/picker';

import waIcon from '../assets/whatsappIcon.png';
import callIcon from '../assets/callIcon.png';
import bloodIcon from '../assets/bloodIcon.png';

const ViewDonorsScreen = () => {
  const [users, setUsers] = useState([]);
  const [blood, setBlood] = useState('');
  useEffect(() => {
    if (blood) {
      firestore()
        .collection('users')
        .where('blood', '==', blood)
        .get()
        .then(querySnapshot => {
          const tempUsers = [];
          querySnapshot.forEach(documentSnapshot => {
            tempUsers.push(documentSnapshot.data());
          });
          setUsers(tempUsers);
        });
    } else {
      firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
          const tempUsers = [];
          querySnapshot.forEach(documentSnapshot => {
            tempUsers.push(documentSnapshot.data());
          });
          setUsers(tempUsers);
        });
    }
  }, [blood]);
  return (
    <AppMainLayout>
      <View style={styles.container}>
        <Picker
          selectedValue={blood}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setBlood(itemValue)}>
          <Picker.Item label="Select Blood Group" value="" />
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
        <FlatList
          style={styles.list}
          data={users}
          renderItem={({item}) => <UserItem item={item} key={item.mobile} />}
          keyExtractor={(item, index) => item.mobile}
        />
      </View>
    </AppMainLayout>
  );
};

function UserItem({item}) {
  return (
    <View style={styles.item}>
      <ImageBackground source={bloodIcon} style={styles.bloodIcon}>
        <Text style={styles.bloodText}>{item.blood}</Text>
      </ImageBackground>
      <View style={styles.detail}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.adress}</Text>
      </View>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => {
          Linking.openURL(`http://wa.me/+91${item.mobile}`);
        }}>
        <Image style={styles.menuIcon} source={waIcon} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => {
          Linking.openURL(`tel:+91${item.mobile}`);
        }}>
        <Image style={styles.menuIcon} source={callIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  picker: {
    height: 50,
    margin: 10,
  },
  list: {
    flex: 1,
    padding: 15,
    paddingBottom: 30,
  },
  item: {
    height: 80,
    marginBottom: 20,
    backgroundColor: '#ddd5',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  bloodIcon: {
    height: 60,
    width: 43,
    justifyContent: 'center',
  },
  bloodText: {
    paddingTop: '30%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  detail: {
    paddingLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '100%',
    width: 'auto',
    justifyContent: 'center',
  },

  menuIcon: {marginHorizontal: 20, width: 30, height: 30},
});

export default ViewDonorsScreen;
