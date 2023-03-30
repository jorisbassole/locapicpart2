import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import { addPlace, removePlace } from '../reducers/user';
import { useDispatch } from 'react-redux'; // mettre l'info dans le store 

export default function PlacesScreen() {

  const name = useSelector((state) => state.user.value.username);
  const cities = useSelector((state) => state.user.value.city);
  console.log(cities)

  const dispatch = useDispatch();
  const [cityname, setcityname] = useState("") // console.log(cityname = paris)

  const handleSubmit = () => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityname}`)
      .then(response => response.json())
      .then(data => {
        let datacity = {
          name: data.features[0].properties.name,
          latitude: data.features[0].geometry.coordinates[0],
          longitude: data.features[0].geometry.coordinates[1],
        }
        dispatch(addPlace(datacity))
        setcityname("")
      })
  }





  const placesData = [
    { name: 'Paris', latitude: 48.859, longitude: 2.347 },
    { name: 'Lyon', latitude: 45.758, longitude: 4.835 },
    { name: 'Marseille', latitude: 43.282, longitude: 5.405 },
  ];

  const places = cities.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text>LAT : {data.latitude} LON : {data.longitude}</Text>
        </View>
        <FontAwesome name='trash-o' size={25} color='#ec6e5b' onPress={() => dispatch(removePlace(data.name))} />
      </View>
    );
  });



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> {name} </Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="New city" onChangeText={(value => setcityname(value))}
          value={cityname} />
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {places}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: '65%',
    marginTop: 6,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: '30%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
