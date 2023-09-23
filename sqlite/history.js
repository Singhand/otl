import * as SQLite from 'expo-sqlite';
import { load } from '../redux/slices/history';

const db = SQLite.openDatabase('main.db');

// drop();
create();

export function drop(params) {
    db.transaction(tx => {
        console.log('drop');
        tx.executeSql('Drop table history', null,
            (txObj, rs) => { console.log('drop success'); },
            (txObj, err) => { console.log(err); });
    });
}

export function create(params) {
    db.transaction(tx => {
        console.log('sqlite create');
        tx.executeSql('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, itemId INTEGER, content TEXT,created INTEGER);', null,
            (txObj, rs) => { console.log('create success history'); },
            (txObj, err) => { console.log(err); });
    });
}

export function init(item, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`select * from history where itemId=? order by created desc`, [item],
            (txObj, rs) => {
                console.log('init success-history');
                let items = [];
                for (var i = 0; i < rs.rows.length; i += 1) {
                    items.push(rs.rows.item(i));
                }
                let payload = { id: item };
                payload[`items`] = items;
                dispatch(load(payload));
            },
            (txObj, err) => { console.log(err); });
    });
}

export function add(itemId, content, dispatch) {
    db.transaction(tx => {
        let date = new Date();
        tx.executeSql(`insert into history (itemId, content, created) values(?,?,?)`, [itemId, content, date.getTime()],
            (txObj, rs) => {
                console.log('add success');
            },
            (txObj, err) => { console.log(err); });
    }, (err) => { console.log(err); },

        () => {
            init(itemId, dispatch);
        }
    );
}

export function edit(history, dispatch) {
    db.transaction(tx => {
        console.log('update content', history);
        tx.executeSql(`update history set content=? where id=?`, [history.content, history.id],
            (txObj, rs) => {
                console.log('update success');
                init(history.itemId, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function remove(history, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`delete from history where id=?`, [history.id],
            (txObj, rs) => {
                console.log('delete success');
                init(history.itemId, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}