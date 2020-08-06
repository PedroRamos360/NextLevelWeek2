import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
   week_day: number;
   from: string;
   to: string;
};

export default class ClassesController {
   async index(request: Request, response: Response) {
      const filters = request.query;

      const subject = filters.subject as string;
      const time = filters.time as string;
      const week_day = filters.week_day as string;

      if (!filters.week_day || !filters.subject || !filters.time) {
         return response.status(400).json({
            error: 'Missing filters to search classes'
         });
      };

      const timeInMinutes = convertHourToMinutes(time);

      const classes = await db('classes')
         .whereExists(function() {
            this.select('class_schedule.*')
               .from('class_schedule') // Olha na tabela class schedule
               .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') // Verifica se o professor (usuário)
               .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // Trabalha no week_day recebido
               .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
               .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
               // os ?? funcionam como um {} no .format do python
         })
         .where('classes.subject', '=', subject) // Verifica quais aulas tem a matéria pesquisada
         .join('users', 'classes.user_id', '=', 'users.id') // Pega as informações do usuário que criou a aula
         .select(['classes.*', 'users.*']); // Todos os dados da tabela classses e users
      return response.json(classes);
   };

   async create(request: Request, response: Response) {
      const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

      // Para que todas as operações aconteçam simultaneamente - se uma der erro ele para o processo inteiro
      const trx = await db.transaction();

      try {
         const insertedUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio });

         const user_id = insertedUsersIds[0]; // Pega o id do primeiro usuário - o único inserido

         const insertedClassesIds = await trx('classes').insert({ subject, cost, user_id });

         const class_id = insertedClassesIds[0]; // Pega o id da primeira aula - única inserida

         const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
               class_id,
               week_day: scheduleItem.week_day,
               from: convertHourToMinutes(scheduleItem.from),
               to: convertHourToMinutes(scheduleItem.to)
            };
         });

         await trx('class_schedule').insert(classSchedule);

         await trx.commit(); // Só aqui as informações são mandadas para o banco de dados

         return response.status(201).send(); // criado com sucesso
      } catch (err) {
         await trx.rollback();

         return response.status(400).json({ // Bad request
            error: 'Unexpected error while creating new class'
         });
      };
   };
};
