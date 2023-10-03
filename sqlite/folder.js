import { load } from '../redux/slices/folder';
import { db } from './database'

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
        // 폴더 아이템 로드
        // 아이템 별 기록, 퀵 삭제 - loop
        // 아이템 삭제
        // 폴더 삭제

        tx.executeSql(`select * from items where folderId=?`, [id],
            (txObj, rs) => {
                console.log('item load success');
                let idcs = 0 // item delete completely success
                const len = rs.rows.length
                for (var i = 0; i < len; i += 1) {
                    let itemId = rs.rows.item(i).id

                    txObj.executeSql(`delete from history where itemId=?`, [itemId],
                        (txObj, rs) => {
                            console.log('item his deleted', itemId)
                            txObj.executeSql(`delete from quicks where itemId=?`, [itemId],
                                (txObj2, rs2) => {
                                    console.log('item quick deleted', itemId)
                                    txObj2.executeSql(`delete from items where id=?`, [itemId],
                                        (txObj3, rs3) => {
                                            console.log('item deleted', itemId)
                                            idcs += 1
                                            if (idcs == len) {
                                                console.log(201)
                                                txObj3.executeSql(`delete from folders where id=?`, [id],
                                                    (txObj, rs) => {
                                                    },
                                                    (txObj, err) => { console.log(err); });

                                            }
                                        }, (txObj3, err3) => { console.log(err3) })
                                },
                                (txObj2, err2) => { console.log(err2) })
                        },
                        (txObj, err) => { console.log(err) });
                }

                if (len == 0) {
                    txObj.executeSql(`delete from folders where id=?`, [id],
                        (txObj, rs) => {
                        },
                        (txObj, err) => { console.log(err); });
                }
            },
            (txObj, err) => { console.log(err); });


    }, (err) => { console.log(err); },
        () => {
            console.log('delete folder success');
            init(dispatch);
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