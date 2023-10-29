import { setTheme, setLang, setHelpFirst1, setHelpFirst2 } from '../redux/slices/user';
import { db } from './database'

// drop();
create();

export function create(params) {
    db.transaction(tx => {
        console.log('sqlite create user');
        tx.executeSql('CREATE TABLE IF NOT EXISTS user (key TEXT PRIMARY KEY, value INTEGER)', null,
            (txObj, rs) => {
                console.log('create user success');
                console.log('insert default user setting')
                txObj.executeSql('insert into user (key,value) values (?,?),(?,?)', ['theme', 0, 'lang', 0],
                    (txObj, rs) => { console.log('default user setting success') },
                    (txObj, err) => { console.log(err); })
                txObj.executeSql('insert into user (key,value) values (?,?),(?,?)', ['helpFirst1', 1, 'helpFirst2', 1],
                    (txObj, rs) => { console.log('default help user success') },
                    (txObj, err) => { console.log(err); })
            },
            (txObj, err) => { console.log(err); });
    });
}

export function initSetting(dispatch) {
    db.transaction(tx => {
        tx.executeSql('select * from user where key in (?,?)', ['theme', 'lang'],
            (txObj, rs) => {
                console.log('init setting')
                for (let i = 0; i < rs.rows.length; i++) {
                    let item = rs.rows.item(i);
                    if (item.key == 'theme') {
                        dispatch(setTheme(item.value))
                    } else if (item.key == 'lang') {
                        dispatch(setLang(item.value))
                    }
                }
            },
            (txObj, err) => { console.log(err); });
    });
}

export function checkFirst(num, dispatch) {
    db.transaction(tx => {
        tx.executeSql('select * from user where key=?', [`helpFirst${num}`],
            (txObj, rs) => {
                console.log('checkFirst')
                for (let i = 0; i < rs.rows.length; i++) {
                    let item = rs.rows.item(i);
                    if (item.value == 1) {
                        if (num == 1) {
                            dispatch(setHelpFirst1(true))
                        } else if (num == 2) {
                            dispatch(setHelpFirst2(true))
                        }
                        txObj.executeSql('update user set value=0 where key=?', [`helpFirst${num}`])
                    }
                }
            },
            (txObj, err) => { console.log(err); });
    });
}

export function updateTheme(theme, dispatch) {
    db.transaction(tx => {
        tx.executeSql('update user set value=? where key=?', [theme, 'theme'],
            (txObj, rs) => {
                console.log('update theme')
                initSetting(dispatch)
            },
            (txObj, err) => { console.log(err); });
    });
}

export function updateLang(lang, dispatch) {
    db.transaction(tx => {
        tx.executeSql('update user set value=? where key=?', [lang, 'lang'],
            (txObj, rs) => {
                console.log('update lang')
                initSetting(dispatch)
            },
            (txObj, err) => { console.log(err); });
    });
}