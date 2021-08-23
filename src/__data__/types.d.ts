declare type Action = { type: string, payload: any }

declare interface IContainerFolder {
    id: number
    level: number
}

declare interface IContainerFile {
    title: string
    level: number
}

declare type FolderData = { id: number, title: string, children?: Array<FolderData> }
