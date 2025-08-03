import {createAction, handleActions} from 'redux-actions';

// 액션 타입 정의하기
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/*
    액션 타입은 대문자로 정의하고, 문자열 내용은 '모듈 이름/액션 이름'과 같은 형태로 작성한다.
    문자열 안에 컴포넌트 이름을 넣음으로써 나중에 프로젝트가 커졌을때 액션의 이름이 충돌되지 않게 해 준다.

*/

//액션 생성 함수 만들기

// export const increase = () => ({type : INCREASE});
// export const decrease = () => ({type : DECREASE});

//createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언할 수 있습니다.
 export const increase = createAction(INCREASE);
 export const decrease = createAction(DECREASE);

// export를 사용함으로써 추후 이 함수를 다른 파일에서 불러와 사용할 수 있습니다.

const initialState = {
    number : 0
};

// 리듀서 함수 선언

// function counter(state = initialState, action){
//     switch(action.type){
//         case INCREASE:
//             return{
//                 number : state.number + 1
//             };
//         case DECREASE:
//             return{
//                 number : state.number - 1
//             };
//         default:
//             return state;
//     }
// }

// handleActions를 시용한 리듀서 함수 작성

const counter = handleActions(
    {
        [INCREASE]: (state, action) => ({number : state.number + 1}),
        [DECREASE]: (state, action) => ({number : state.number - 1})
    },
    initialState,
);

export default counter;

/*
    export default counter : 단 한개만 밖으로 내보낼 수 있다.
    export const decrease = () => ({type : DECREASE}) : exprot 1개씩 선언한 export 개수만큼 여러 개 밖으로 보낼수 있다
*/