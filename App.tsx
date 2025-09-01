/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { CheckLogo, DeleteLogo, EditLogo } from './assets';


function App() {
  const [userInput, setUserInput] = useState<string>("");
  const [list, setList] = useState<{value: string, edit: boolean}[]>([]);
  const [temp, setTemp] = useState("");

  const onChangeText = (val: string) => {
    setUserInput(val);
  }

  const onAdd = () => {
    const newList = [...list];
    newList.push({value: userInput, edit: false});
    setList(newList);
    setUserInput("");
  }

  const onDeleteItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  const onEditItem = (index) => {
    const newList = list.map((item, idx) => {
      if(index === idx){
        return {
          ...item,
          edit: true
        }
      }else {
        return {
          ...item,
          edit: false
        }
      }
    });
    setList(newList);
    setTemp(list[index].value);
  }

  const onChange = (text) => {
    setTemp(text);
  }

  const onSubmitItem = (index) => {
    const newList = list.map((item, idx) => {
      if(index === idx){
        return {
          ...item,
          edit: false,
          value: temp
        }
      }else {
        return {
          ...item,
          edit: false
        }
      }
    });
    setList(newList);
    setTemp("");
  }

  const renderItem = ({item, index}) => {
    const onDelete = () => {
      onDeleteItem(index);
    }
    const onEdit = () => {
      onEditItem(index);
    }
    const onSubmit = () => {
      onSubmitItem(index);
    }
    return (
      <View key={index} >
        { !item.edit? 
        <View style={styles.itemView}>
          <View style={styles.textView}>
            <Text style={styles.valueText}>{item.value}</Text>
          </View>
          <TouchableOpacity style={styles.action} onPress={onDelete}>
            <Image source={DeleteLogo} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={onEdit}>
            <Image source={EditLogo} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        :
        <View style={styles.inputView}>
          <View style={styles.textView}>
            <TextInput onChangeText={onChange} value={temp} style={styles.input}/>
          </View>
          <TouchableOpacity style={styles.action} onPress={onSubmit}>
            <Image source={CheckLogo} style={styles.icon} />
          </TouchableOpacity>
        </View>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TODO List</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.input} value={userInput} onChangeText={onChangeText}/>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonView} onPress={onAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        <FlatList 
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, key) => `""+${key}`}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black'
  },
  inputView: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  buttonView: {
    margin: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: 80,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listView: {
    flex: 1,
  },
  itemView: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  textView: {
    flex: 1,
  },
  valueText: {
    fontSize: 20,
    color: 'black', 
  },
  icon: {
    height: 20,
    width: 20,
  },
  action: {
    backgroundColor: 'white',
    margin: 5,
    padding:5,
    borderRadius: 20,
    elevation: 10,
  }
});

export default App;
