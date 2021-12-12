import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'pg';

async function bootstrap() {

  console.log(process.env.DATABASE_URL);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();
  
  // client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  //   if (err) throw err;
  //   for (let row of res.rows) {
  //     console.log(JSON.stringify(row));
  //   }
  //   client.end();
  // });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

}
bootstrap();
