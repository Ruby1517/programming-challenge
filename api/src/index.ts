import Hapi from '@hapi/hapi';
import { makeDb, startDatabase } from './database';
import dotenv from 'dotenv';
import knex from 'knex';

const init = async () => {
  dotenv.config();
  const db = makeDb();

  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/tasks',
    handler: async (r, h) => {
      try {
        const  { rows } = await db.raw('select * from tasks');
        return h.response(rows).code(200)
      } catch (error) {
        console.error(error);
        return h.response().code(500)        
      }
    } 
  });
 
  
      /**
       * Mission Two: Insert a task into the database.
       * 
       * Receive a post request from the front end
       * and insert it into the database.details, too
       * 
       * Definition of done:
       * [ ] the record is inserted into the database
       * [ ] a success response is returned
       * 
       * Your submission will be judged out of 10 points based on
       * the following criteria:
       * 
       * - Works as expected - 5 points
       * - Code quality - 5 points
       *   - Is the code clean and easy to read?
       *   - Are there any obvious bugs?
       *   - Are there any obvious performance issues?
       *   - Are there comments where necessary?
    
      */

  server.route({
   method: 'POST',
   path: '/addTask', // Bonus points if you give it a sensical name ;)
   handler: async (r, h) => {
     try {
       const content  = r.payload;
       const insetedTask = await db('tasks').insert(content); 
       return h.response(insetedTask).code(201)
     } catch (error) {
       console.error('Error inserting task:', error)
     }
   } 
  });

  // Update data
  server.route({
    method: 'PUT',
    path: '/tasks/{taskId}',
    handler: async(r, h) => {
      const { taskId } = r.params;
      const { isComplete } = r.payload;
      try { 
        //Update is_complet column in tasks table
        await db('tasks').where('tasks_id', taskId).update('is_complete', isComplete);
        return h.response({message: 'Successfully Updatedd'}).code(200)
      } catch (error) {
        console.error('Error updating task:', error);
        return h.response({ error: 'Internal Server Error' }).code(500)
      }
    } 
  });


  
  // Delete task
  server.route({
    method: 'DELETE',
    path: '/tasks/{taskId}',
    handler: async(r, h) => {
      const { taskId } = r.params;
      try {
        await db('tasks').where('tasks_id', taskId).del();

        return h.response({message: 'deleted'}).code(200)
      } catch (error) {
        console.error('Error deleting task:', error);
        return h.response({ error: 'Internal Server Error' }).code(500)
      }
    } 
  });


  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
startDatabase();

