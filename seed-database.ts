import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './src/modules/auth/entities/auth.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
   type: 'postgres',
   host: process.env.DATABASE_HOST,
   port: parseInt(process.env.DATABASE_PORT || '5432', 10),
   username: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASS,
   database: process.env.DATABASE_NAME,
   entities: [User],
   synchronize: true,
});

async function seed() {
   try {
      await AppDataSource.initialize();
      console.log('✅ Database connected!');

      const userRepo = AppDataSource.getRepository(User);

      const adminEmail = 'admin@bookbar.com';
      const existingAdmin = await userRepo.findOne({ where: { email: adminEmail } });

      if (existingAdmin) {
         console.log('⚠️ Admin already exists, skipping seed.');
         return;
      }

      const hashedPassword = await bcrypt.hash('Admin@123', 10);

      const adminUser = userRepo.create({
         name: 'Admin',
         email: adminEmail,
         password: hashedPassword,
         role: 'admin',
      });

      await userRepo.save(adminUser);
      console.log('🌱 Admin user created successfully!');
   } catch (error) {
      console.error('❌ Seeding failed:', error);
   } finally {
      await AppDataSource.destroy();
      console.log('🔒 Database connection closed.');
   }
}

seed();