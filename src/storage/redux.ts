import {createStore} from 'redux'

const reducer = (state = {}, action: Action) => {
    switch (action.type) {
        case "SET_DIR_DATA": {
            return {
                ...state, [action.payload.id]: {
                    title: action.payload.title,
                    children: action.payload.children
                }

            }
        }
        default: {
            return state
        }
    }
}


const reduxHandler = {
    store: createStore(reducer),
    setFolderInfo: (data: FolderData): Action => {
        return {
            type: "SET_DIR_DATA",
            payload: {
                id: data.id,
                title: data.title,
                children: data.children
            }
        }
    }
}

export {
    reduxHandler
}

