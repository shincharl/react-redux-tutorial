import {createAction, handleActions} from 'redux-actions';
import produce from 'immer';

//액션 타입 정의하기
const CHANGE_INPUT = 'todos/CHANGE_INPUT' //인풋값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE'; // todo를 제거함

//createAction으로 액션을 만들면 액션에 필요한 추가 데이터는 payload라는 이름을 사용한다.
//액션 생성함수에서 받아온 파라미터를 그대로 payload에 넣는 것이 아니라 변형을 주어서 넣고 싶다면
//두 번째 함수에 payload를 정의하는 함수를 따로 선언해서 넣어 주면 된다.

export const hangeInput = createAction(CHANGE_INPUT, input => input);

//액션 생성함수 만들기
// export const changeInput = input => ({
//     type : CHANGE_INPUT,
//     input
// });

let id = 3;
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false,
}));

// let id = 3;
// export const insert = text => ({
//     type: INSERT,
//     todo: {
//         id: id++,
//         text,
//         done: false
//     }
// });

export const toggle = createAction(TOGGLE, id => id);

// export const toggle = id => ({
//     type : TOGGLE,
//     id
// });

export const remove = createAction(REMOVE, id => id);

// export const remove = id => ({
//     type: REMOVE,
//     id
// });

// 객체에 한 개 이상의 값이 들어가므로 불변성을 유지해 주어야 한다. 스프레드 연산자 필수!

const initialState = {
    input: '',
    todos : [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false
        }
    ]
};

// createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣을때 원하는 이름으로 넣는 것이 아니라 action.payload라는 이름을 공통적으로 넣어준다.
// 기존의 업데이트 로직에서도 모두 action.payload값을 조회하여 업데이트하도록 구현해 주어야 한다.

const todos = handleActions(
    {
        [CHANGE_INPUT] : (state, {payload : input}) => 
            produce(state, draft => {
                draft.input = input;
            }),
        [INSERT] : (state, {payload : todo}) => 
            produce(state, draft => {
                draft.todos.push(todo);
        }),
        [TOGGLE]: (state, {payload: id}) => 
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        [REMOVE] :(state, {payload : id}) =>
            produce(state, draft => {
                const index = draft.todos.findIndex(todo => todo.id === id);
                draft.todos.splice(index, 1);
        }),
    },
    initialState,
);

//리듀서 함수 만들기
// function todos(state = initialState, action){
//     switch(action.type){
//         case CHANGE_INPUT:
//             return{
//                 ...state,
//                 input : action.input
//             };
//         case INSERT:
//             return{
//                 ...state,
//                 todos: state.todos.concat(action.todo)
//             };
//         case TOGGLE:
//             return {
//                 ...state,
//                 todos: state.todos.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)
//             };
//         case REMOVE:
//             return{
//                 ...state,
//                 todos: state.todos.filter(todo => todo.id !== action.id)
//             };
//         default:
//             return state;
//     }
// }

export default todos;

/* 루트 리듀서 만들기

   - 나중에 스토어를 만들때는 리듀서를 하나로 만들어야 한다. 
*/

//immer을 사용하면 깊은 객체를 사용하지 않고 얕은 객체를 사용하여 보다 쉽게 관리할 수 있다.