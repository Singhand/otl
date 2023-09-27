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
                console.log('quick init success');
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

export function add(quick, dispatch) {
    db.transaction(tx => {
        console.log('try to add quick', quick)
        let date = new Date();
        tx.executeSql(`insert into quicks (itemId, title,type, prefix,suffix,itemOrder) values(?,?,?,?,?,?)`,
            [quick.itemId, quick.title, quick.type, quick.prefix, quick.suffix, date.getTime()],
            (txObj, rs) => {
                console.log('add success');
            },
            (txObj, err) => { console.log(err); });
    }, (err) => { console.log(err); },

        () => {
            init(quick.itemId, dispatch);
        }
    );
}

export function edit(quick, dispatch) {
    db.transaction(tx => {
        console.log('update title to', quick.title);
        tx.executeSql(`update quicks set title=?, prefix=?, suffix=? where id=?`, [quick.title, quick.prefix, quick.suffix, quick.id],
            (txObj, rs) => {
                console.log('update success');
                init(quick.itemId, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function remove(quick, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`delete from quicks where id=?`, [quick.id],
            (txObj, rs) => {
                console.log('delete success');
                init(quick.itemId, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function updateOrder(quicks, itemId, dispatch) {
    let date = new Date();
    db.transaction(tx => {
        quicks.forEach((item, index) => {
            const id = item.id;
            tx.executeSql(`update quicks set itemOrder=? where id=?`, [index, id],
                (txObj, rs) => {
                },
                (txObj, err) => { });
        });
    }, (err) => { console.log(err); },
        () => {
            console.log('db update suc');
            init(itemId, dispatch);
        }
    );
}