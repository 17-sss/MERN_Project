import React, { useState, useCallback } from 'react';
import CreateInputForm, {
    CreateInputResult,
} from '../components/CreateInputTemplate';

const CreateInputContainer = (props) => {
    const { inputopt, btnopt, resultopt } = props;

    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');
    
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onInsert = useCallback(
        (Avalue) => {
            setItems(items.concat(Avalue));
        },
        [items],
    );

    const onSubmit = useCallback(
        (e) => {
            onInsert(value); // [!] redux에 등록해야할듯.
            setValue('');

            // submit 이벤트는 브라우저에서 새로고침을 발생시킴.
            // 이를 방지하기 위해 이 함수를 호출
            e.preventDefault();
            
            console.log(items); /* 테스트용 추후제거*/
        },
        [onInsert, value,
            // eslint-disable-next-line
            items],
    );

    // ** render **
    return (
        <>
            <CreateInputForm
                inputopt={inputopt}
                btnopt={btnopt}
                onChange={onChange}
                onSubmit={onSubmit}                
                value={value}
            />
            <CreateInputResult resultopt={resultopt} />
        </>
    );
};

export default CreateInputContainer;
