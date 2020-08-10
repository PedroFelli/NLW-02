import React, { useState, useEffect } from 'react';
import {View,ScrollView, Text, TextInput} from 'react-native';
import {Feather} from '@expo/vector-icons';
import  AsyncStorage from '@react-native-community/async-storage'

import styles from './styles';
import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

function TeacherList(){
  const [teachers,setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites(){
    AsyncStorage.getItem('favorites').then(response =>{
      if(response){
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })
        
        setFavorites(favoritedTeachersIds);
      }
    })
  }

  useEffect(() => {
  
  }, []);

  function handleToggleFiltersVisibible(){
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit(){

    loadFavorites();
    
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        }
      })

      setIsFiltersVisible(false);
    
      setTeachers(response.data);
  }

  return (
    <View  style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisibible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
       {isFiltersVisible && (
          <View style={styles.searchForm}>
          <Text style={styles.label}>Matéria</Text>
          <TextInput
            placeholderTextColor="#c1dccc" 
            value={subject}
            onChangeText={text=> setSubject(text)}
            style={styles.input}
            placeholder="Qual a matéria"
          />
            <View  style={styles.inputGroup}>
              <View  style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1dccc"
                  value={week_day}
                  onChangeText={text=> setWeekday(text)}
                  style={styles.input}
                  placeholder="Qual o dia?"
                />
              </View>

              <View  style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1dccc"
                  value={time}
                  onChangeText={text=> setTime(text)}
                  style={styles.input}
                  placeholder="Qual o horário?"
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
        </View>
       )}
      </PageHeader>
      <ScrollView  style={styles.teacherList} 
        contentContainerStyle={{ 
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}>
  
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem 
            key={teacher.id}  
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
            />
          )
        })}
       
      </ScrollView>
    </View>

  )
}
export default TeacherList;