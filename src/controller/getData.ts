import {reduxHandler} from "../storage/redux";


const fetchData = async (dirId: number) => {
    const url: string = (dirId) ?
        `http://164.90.161.80:3000/api/content?dirId=${dirId}` :
        `http://164.90.161.80:3000/api/content`
    try {
        const call = await fetch(url)
        if (!call.ok) {
            throw new Error(String(call.status))
        }
        const data = await call.json()
        return reduxHandler.setFolderInfo(data)
    } catch (e) {
        return (e)
    }

}

const getData = (id: number) => {
    if (!(id in reduxHandler.store.getState())) {
        reduxHandler.store.dispatch({
            type: "SET_DIR_DATA",
            payload: {
                [id]: {
                    title: "Loading",
                    children: []
                }
            }
        })
        fetchData(id).then(answer => reduxHandler.store.dispatch(answer!)).catch(e => {
            console.log(e);
        })
    }
}

const getContent = (id: number): FolderData => {
    // @ts-ignore
    return reduxHandler.store.getState()[id]

}


export {getData, getContent}
