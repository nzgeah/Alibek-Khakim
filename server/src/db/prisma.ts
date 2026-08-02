import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL
let prisma: PrismaClient

if (connectionString) {
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  prisma = new PrismaClient({ adapter })
} else {
  // Fallback in case of missing env var, mostly for type checking purposes without running DB
  prisma = new PrismaClient()
}

export default prisma
