import * as SQLite from 'expo-sqlite';
import { load } from '../redux/slices/item';

const db = SQLite.openDatabase('main.db');

// drop();
create();

export function drop(params) {
    db.transaction(tx => {
        console.log('drop');
        tx.executeSql('Drop table items', null,
            (txObj, rs) => { console.log('drop success'); },
            (txObj, err) => { console.log(err); });
    });
}

export function create(params) {
    db.transaction(tx => {
        console.log('sqlite create');
        tx.executeSql('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, folderId INTEGER, title TEXT, opened INTEGER default 1, itemOrder INTEGER);', null,
            (txObj, rs) => { console.log('create success'); },
            (txObj, err) => { console.log(err); });

    });
}

export function init(folder, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`select * from items where folderId=? order by itemOrder`, [folder],
            (txObj, rs) => {
                console.log('init success');
                let items = [];
                for (var i = 0; i < rs.rows.length; i += 1) {
                    items.push(rs.rows.item(i));
                }
                let payload = { id: folder };
                payload[`items`] = items;
                dispatch(load(payload));
            },
            (txObj, err) => { console.log(err); });
    });
}

export function add(title, folder, dispatch) {
    db.transaction(tx => {
        let date = new Date();
        tx.executeSql(`insert into items (folderId, title, itemOrder) values(?,?,?)`, [folder, title, date.getTime()],
            (txObj, rs) => {
                txObj.executeSql(`insert into quicks (itemId, title, type, itemOrder) values(?,?,?,?)`, [rs.insertId, "기록", 1, date.getTime()],
                    (txObj2, rs) => {
                        console.log(`default quick action created`)
                    },
                    (txObj2, err) => { console.log(err); });
            },
            (txObj, err) => { console.log(err); });

        //Quick Action
        // tx.executeSql(`insert into quicks (itemId, title, type, itemOrder) values(?,?,?,?)`, [1, title, 1, date.getTime()],
        //     (txObj, rs) => {
        //     },
        //     (txObj, err) => { console.log(err); });
    }, (err) => { console.log(err); },

        () => {
            console.log('add success');
            init(folder, dispatch);
        }
    );
}

export function edit(id, title, folder, dispatch) {
    db.transaction(tx => {
        console.log('update title to', title);
        tx.executeSql(`update items set title=? where id=?`, [title, id],
            (txObj, rs) => {
                console.log('update success');
                init(folder, dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function remove(id, folder, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`delete from items where id=?`, [id],
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
            tx.executeSql(`update items set itemOrder=? where id=?`, [index, id],
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