import React, {useEffect, useState} from 'react';
import Styles from './styles/containers.module.sass'
import {Provider, useSelector} from 'react-redux'
import {reduxHandler} from './storage/redux'
import ImageFile from './icons/icon-file.svg'
import ImageFolder from './icons/icon-folder.svg'
import {getData, getContent} from "./controller/getData";
import './index.css'

const ContainerFolder: React.FC<IContainerFolder> = ({id, level}) => {
    const [open, setOpen] = useState(false)
    const style = Styles.Folder + ' ' + ((open) ? Styles.Open : '')
    const containerMargin = {marginLeft: (level * 24) + 'px'}

    const content = useSelector(state => {
        return String(id) in state
    })
    useEffect(() => {
        getData(id)
    }, [id])

    const dir = getContent(id)!;
    if (dir && content) {
        return (
            <>
                <div className={Styles.Container} style={containerMargin} onClick={setOpen.bind(this, !open)}>
                    <div className={style}>
                        <img className={Styles.Icon} src={ImageFolder} alt=""/>
                        {dir.title}
                    </div>
                </div>
                {open && dir.children && dir.children.map((childrenDir, index) => {
                    if ("children" in childrenDir) {
                        return <ContainerFolder key={index} id={childrenDir.id} level={level + 1}/>
                    } else {
                        return <ContainerFile key={index}  title={childrenDir.title} level={level + 1}/>
                    }
                })}
            </>
        )
    } else {
        return (<></>)
    }

}
const ContainerFile: React.FC<IContainerFile> = ({title, level}) => {
    const containerMargin = {marginLeft: (level * 24) + 'px'}

    return (
        <div className={Styles.Container} style={containerMargin}>
            <div className={Styles.File}>
                <img className={Styles.Icon} src={ImageFile} alt=""/>
                {title}
            </div>
        </div>
    )
}


const Main: React.FC = () => {
    return (
        <>
            <div className={Styles.Header}>
                File manager
            </div>
            <div className={Styles.FS}>
                <ContainerFolder id={0} level={0}/>
            </div>
        </>
    )
}


function App() {
    return (
        <Provider store={reduxHandler.store}>
            <Main/>
        </Provider>
    );
}

export default App;
