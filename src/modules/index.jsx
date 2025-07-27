/* 루트 리듀서 만들기

   - 나중에 스토어를 만들때는 리듀서를 하나로 만들어야 한다.
   - 기존에 만들었던 모든 리듀서를 하나로 뭉쳐야 한다.
   - 이 작업은 리덕스에서 제공하는 combineReducers라는 유틸 함수를 사용하면 쉽게 합칠 수 있다.
*/

import {combineReducers} from 'redux';
import counter from "./counter";
import todos from "./todos";


const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;