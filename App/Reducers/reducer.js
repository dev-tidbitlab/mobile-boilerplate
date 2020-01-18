const INITIAL_STATE = {
    currentUser: {},
    UserInfo: {},
    isLoggingIn: false,
    loading: false,
    ErrorToaster: {
        message: '',
        toast: false
    },
    StudentCourseList: [],
    StudentCourseDetails: {},
    StudentOrdersList: []
};

const AuthReducer = (state = INITIAL_STATE, action) => {
    console.log(action.type, action, 'ppppp')
    switch (action.type) {
        case 'LOGGED_IN':
            return {
                ...state,
                isLoggingIn: action.payload
            };
        case 'CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            };
        case 'SAVE_USER_INFO':
            return {
                ...state,
                UserInfo: action.payload
            };
        case 'LOADER_START':
            return {
                ...state,
                loading: true
            };
        case 'LOADER_STOP':
            return {
                ...state,
                loading: false
            };
        case 'ERROR_TOAST_SHOW':
            return {
                ...state,
                ErrorToaster: action.payload
            };
        case 'ERROR_TOAST_HIDE':
            return {
                ...state,
                ErrorToaster: action.payload
            };
        case 'STUDENT_COURSES_LIST_DATA':
            return {
                ...state,
                StudentCourseList: action.payload
            };
        case 'STUDENT_COURSES_DETAILS_DATA':
            return {
                ...state,
                StudentCourseDetails: action.payload
            };
        case 'STUDENT_ORDERS_LIST_DATA':
            return {
                ...state,
                StudentOrdersList: action.payload
            };
        default:
            return state;
    };
}
export default AuthReducer;