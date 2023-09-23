import * as SQLite from 'expo-sqlite';
import { load } from '../redux/slices/folder';

const db = SQLite.openDatabase('main.db');

// drop();
create();

export function drop(params) {
    db.transaction(tx => {
        console.log('drop');
        tx.executeSql('Drop table folders', null,
            (txObj, rs) => { console.log('drop success'); },
            (txObj, err) => { console.log(err); });
    });
}

export function create(params) {
    db.transaction(tx => {
        console.log('sqlite create');
        tx.executeSql('CREATE TABLE IF NOT EXISTS folders (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, opened INTEGER default 1, itemOrder INTEGER);', null,
            (txObj, rs) => { console.log('create success'); },
            (txObj, err) => { console.log(err); });

    });
}

export function init(dispatch) {
    db.transaction(tx => {
        tx.executeSql(`select * from folders order by itemOrder`, null,
            (txObj, rs) => {
                console.log('init success');
                let items = [];
                for (var i = 0; i < rs.rows.length; i += 1) {
                    items.push(rs.rows.item(i));
                }
                dispatch(load(items));
            },
            (txObj, err) => { console.log(err); });
    });
}

export function add(title, dispatch) {
    db.transaction(tx => {
        console.log('do add title', title);
        let date = new Date();
        tx.executeSql(`insert into folders (title, itemOrder) values(?,?)`, [title, date.getTime()],
            (txObj, rs) => {
                console.log('add success');
            },
            (txObj, err) => { console.log(err); });
    }, (err) => { console.log(err); },

        () => {
            init(dispatch);
        }
    );
}

export function edit(id, title, dispatch) {
    db.transaction(tx => {
        console.log('update title to', title);
        tx.executeSql(`update folders set title=? where id=?`, [title, id],
            (txObj, rs) => {
                console.log('update success');
                init(dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function remove(id, dispatch) {
    db.transaction(tx => {
        tx.executeSql(`delete from folders where id=?`, [id],
            (txObj, rs) => {
                console.log('delete success');
                init(dispatch);
            },
            (txObj, err) => { console.log(err); });
    });
}

export function updateOrder(folders, dispatch) {
    let date = new Date();
    db.transaction(tx => {
        folders.forEach((folder, index) => {
            const id = folder.id;
            tx.executeSql(`update folders set itemOrder=? where id=?`, [index, id],
                (txObj, rs) => {
                },
                (txObj, err) => { });
        });
    }, (err) => { console.log(err); },
        () => {
            console.log('db update suc');
            init(dispatch);
        }
    );
}