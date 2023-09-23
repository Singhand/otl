import * as SQLite from 'expo-sqlite';
import { load } from '../redux/slices/quick';

const db = SQLite.openDatabase('main.db');

// drop();
create();

export function drop(params) {
    db.transaction(tx => {
        console.log('drop');
        tx.executeSql('Drop table quicks', null,
            (txObj, rs) => { console.log('drop success'); },
            (txObj, err) => { console.log(err); });
    });
}

export function create(params) {
    db.transaction(tx => {
        console.log('sqlite create');
        tx.executeSql('CREATE TABLE IF NOT EXISTS quicks (id INTEGER PRIMARY KEY AUTOINCREMENT, itemId INTEGER, title TEXT,type INTEGER,prefix TEXT default "",suffix TEXT default "", itemOrder INTEGER);', null,
            (txObj, rs) => { console.log('create success quicks'); },
            (txObj, err) => { console.log(err); });
    });
}

export function init(item, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`select * from quicks where itemId=? order by itemOrder`, [item],
            (txObj, rs) => {
                console.log('init success');
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

export function add(title, folder, dispatch) {
    db.transaction(tx => {
        let date = new Date();
        tx.executeSql(`insert into quicks (folderId, title, itemOrder) values(?,?,?)`, [folder, title, date.getTime()],
            (txObj, rs) => {
                console.log('add success');
            },
            (txObj, err) => { console.log(err); });
    }, (err) => { console.log(err); },

        () => {
            init(folder, dispatch);
        }
    );
}

export function edit(id, title, folder, dispatch) {
    db.transaction(tx => {
        console.log('update title to', title);
        tx.executeSql(`update quicks set title=? where id=?`, [title, id],
            (txObj, rs) => {
                console.log('update success');
                init(folder, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function remove(id, folder, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`delete from quicks where id=?`, [id],
            (txObj, rs) => {
                console.log('delete success');
                init(folder, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function updateOrder(items, folder, dispatch) {
    let date = new Date();
    db.transaction(tx => {
        items.forEach((item, index) => {
            const id = item.id;
            tx.executeSql(`update quicks set itemOrder=? where id=?`, [index, id],
                (txObj, rs) => {
                },
                (txObj, err) => { });
        });
    }, (err) => { console.log(err); },
        () => {
            console.log('db update suc');
            init(folder, dispatch);
        }
    );
}