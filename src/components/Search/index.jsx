import React from 'react'
import styles from './Search.module.scss';
import { setCurrentPage, setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from 'react-redux';
import { useRef, useMemo } from 'react';
import debounce from 'lodash.debounce'
import { useState } from 'react';


const Search = (props) => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const inputDebounce = useMemo(() =>
        debounce((value) => {
            dispatch(setSearchValue(value));
        }, 500),
        // eslint-disable-next-line
        []);

    const onChangeInputValue = (event) => {
        setInputValue(event.target.value);
        inputDebounce(event.target.value);
        dispatch(setCurrentPage(1));

    }

    const onClickClearBtn = () => {
        dispatch(setSearchValue(''));
        setInputValue('');
        inputRef.current.focus();
    }

    return (
        <div className={styles.search_wrapper}>
            <svg className={styles.search_icon} enableBackground="new 0 0 32 32" id="EditableLine" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><line fill="none" id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366" /></svg>
            <input ref={inputRef} onChange={onChangeInputValue} value={inputValue} className={styles.input} type="text" placeholder='Поиск пиццы ...' />
            {
                inputValue ?
                    (<svg className={styles.clearinput_icon} onClick={() => onClickClearBtn()} data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg"><path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" /></svg>)
                    : null
            }
        </div>
    )
}

export default Search