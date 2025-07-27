//액션 타입 정의하기
const CHANGE_INPUT = 'todos/CHANGE_INPUT' //인풋값을 변경함
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

//액션 생성함수 만들기
export const changeInput = input => ({
    type : CHANGE_INPUT,
    input
});

let id = 3;
export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false
    }
});

export const toggle = id => ({
    type : TOGGLE,
    id
});

export const remove = id => ({
    type: REMOVE,
    id
});

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

//리듀서 함수 만들기
function todos(state = initialState, action){
    switch(action.type){
        case CHANGE_INPUT:
            return{
                ...state,
                input : action.input
            };
        case INSERT:
            return{
                ...state,
                todos: state.todos.concat(action.todo)
            };
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)
            };
        case REMOVE:
            return{
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        default:
            return state;
    }
}

export default todos;

/* 루트 리듀서 만들기

   - 나중에 스토어를 만들때는 리듀서를 하나로 만들어야 한다. 
*/