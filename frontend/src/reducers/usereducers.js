export const initialState = null;

export const reducer = (state, action) => {
    if (action.type === "USER") {
        console.log("payload= ", action.payload)//the user info
        return action.payload;
    }
    if (action.type === "CLEAR") {
        return null;
    }
    return state;
}
