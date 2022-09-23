import { Pool, Client } from "pg";
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'planit',
password: 'postgres',
port: 5432
});
pool.connect(err => {
if (err) {
console.error('connection error', err.stack)
} else {
console.log('connected')
}
});