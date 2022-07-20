interface ExecuteCommandFunc<T> {
    (): Promise<T>;
}

export interface Command<T> {
    execute: ExecuteCommandFunc<T>;
}