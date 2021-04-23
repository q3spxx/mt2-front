import actionCreatorFactory, { AsyncActionCreators } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export class ActionsFactory {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    public createReadAction<P = void, R = void, E = void>(name: string): AsyncActionCreators<P, R, E> {
        return actionCreator.async<P, R, E>(`read_${this.prefix}_${name}`);
    }

    public createInsertAction<P = void, R = void, E = void>(name: string): AsyncActionCreators<P, R, E> {
        return actionCreator.async<P, R, E>(`insert_${this.prefix}_${name}`);
    }

    public createUpdateAction<P = void, R = void, E = void>(name: string): AsyncActionCreators<P, R, E> {
        return actionCreator.async<P, R, E>(`update_${this.prefix}_${name}`);
    }

    public createDeleteAction<P = void, R = void, E = void>(name: string): AsyncActionCreators<P, R, E> {
        return actionCreator.async<P, R, E>(`delete_${this.prefix}_${name}`);
    }
}
