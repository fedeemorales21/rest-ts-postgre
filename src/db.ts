import { Pool } from 'pg'
import { config } from 'dotenv'

config()
export const pool: Pool = new Pool({
    user: process.env.PG_USER || 'postgres',
    password:process.env.PG_PASSWORD || '1234',
    host: process.env.PG_HOST || 'localhost',
    database:process.env.PG_DATABASE || 'postgres',
    port: 5432
})