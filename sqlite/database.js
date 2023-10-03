import * as SQLite from 'expo-sqlite';

console.log('db load')

export let db = SQLite.openDatabase('main.db');

export async function close() {
    console.log('close db')
    db.closeAsync()
}

export function open() {
    console.log('open db')
    db = SQLite.openDatabase('main.db')
}