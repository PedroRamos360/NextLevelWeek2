import React from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css'
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


export default function TeacherList() {
   return (
      <div id="page-teacher-list" className="container">
         <PageHeader title="Estes são os proffys disponíveis.">
            <form id="search-teachers">
            <Select
                  name="subject"
                  label="Matéria"
                  options={[
                     { value: '1', label: 'Artes' },
                     { value: '2', label: 'Biologia' },
                     { value: '3', label: 'Educação física' },
                     { value: '4', label: 'Filosofia' },
                     { value: '5', label: 'Física' },
                     { value: '6', label: 'Geografia' },
                     { value: '7', label: 'História' },
                     { value: '8', label: 'Matemática' },
                     { value: '9', label: 'Português' },
                     { value: '10', label: 'Química' },
                     { value: '11', label: 'Sociologia' },
                  ]}
               />
               <Select
                  name="week_day"
                  label="Dia da semana"
                  options={[
                     { value: '1', label: 'Domingo' },
                     { value: '2', label: 'Segunda-feira' },
                     { value: '3', label: 'Terça-feira' },
                     { value: '4', label: 'Quarta-feira' },
                     { value: '5', label: 'Quinta-feira' },
                     { value: '6', label: 'Sexta-feira' },
                     { value: '7', label: 'Sábado' },
                  ]}
               />
               <Input type="time" name="time" label="Hora"/>
            </form>
         </PageHeader>

         <main>
            <TeacherItem />
            <TeacherItem />
            <TeacherItem />
            <TeacherItem />
            <TeacherItem />
            <TeacherItem />
         </main>
      </div>
   )
}
