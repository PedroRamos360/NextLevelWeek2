import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { Teacher } from '../../components/TeacherItem/';
import { useFocusEffect } from '@react-navigation/native';

export default function TeacherList() {
   const [teachers, setTeachers] = useState([]);
   const [favorites, setFavorites] = useState<number[]>([]);

   const [isFiltersVisible, setIsFiltersVisible] = useState(false);

   const [subject, setSubject] = useState('');
   const [week_day, setWeekDay] = useState('');
   const [time, setTime] = useState('');

   function loadFavorites() {
      AsyncStorage.getItem('favorites').then(response => {
         if (response) {
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
               return teacher.id;
            })

            setFavorites(favoritedTeachersIds);
         }
      });
   }

   useFocusEffect(() => {
      loadFavorites();
   })

   function handleToggleFiltersVisible() {
      setIsFiltersVisible(!isFiltersVisible);
   }

   async function handleFiltersSubmit() {
      loadFavorites();
      const response = await api.get('classes', {
         params: {
            subject,
            week_day,
            time,
         }
      });

      setTeachers(response.data);
   }

   return (
      <View style={styles.container}>
         <PageHeader 
            title='Proffys disponíveis' 
            headerRight={(
               <BorderlessButton>
                  <Feather onPress={handleToggleFiltersVisible} name="filter" size={20} color='#fff'/>
               </BorderlessButton>
            )}
         >

         { isFiltersVisible && (
            <View style={styles.searchForm}>
               <Text style={styles.label}>Matéria</Text>
               <TextInput 
                  style={styles.input}
                  value={subject}
                  onChangeText={text => setSubject(text)}
                  placeholder="Qual matéria?"
                  placeholderTextColor="#c1bccc"
               />

               <View style={styles.inputGroup}>
                  <View style={styles.inputBlock}>
                     <Text style={styles.label}>Dia da semana</Text>
                     <TextInput
                        style={styles.input}
                        value={week_day}
                        onChangeText={text => setWeekDay(text)}
                        placeholder='Qual dia?'
                        placeholderTextColor="#c1bccc"
                     />
                  </View>

                  <View style={styles.inputBlock}>
                     <Text style={styles.label}>Horário</Text>
                     <TextInput
                        style={styles.input}
                        value={time}
                        onChangeText={text => setTime(text)}
                        placeholder='Qual horário?'
                        placeholderTextColor="#c1bccc"
                     />
                  </View>
               </View>
               <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                     <Text style={styles.submitButtonText}>Filtrar</Text>
               </RectButton>
            </View>
         )}
         </PageHeader>

         <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
               paddingHorizontal: 16,
               paddingBottom: 16,
            }}
         >
            { teachers.map((teacher: Teacher) => {
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
   );
}