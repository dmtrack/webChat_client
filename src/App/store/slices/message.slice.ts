import produce from 'immer';
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import {
    ICreateMessage,
    IMessage,
    IMessageState,
} from '../../interfaces/IMessage';

const initialState: IMessageState = {
    loading: false,
    error: '',
    messages: [],
    option: 'inbox',
};

interface IMessagesOptions {
    messages: IMessage[];
    username: string | null;
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true;
        },
        fetchSuccess(state, action: PayloadAction<IMessage[]>) {
            state.loading = false;
            state.messages = action.payload;
        },
        createMessage(state, action: PayloadAction<ICreateMessage>) {
            if (!state.messages.find((m) => m.id === action.payload.id)) {
                state.messages = [action.payload, ...state.messages];
            }

            produce(state.messages, (draft) => {
                draft.push(action.payload);
            });
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message + ': ' + action.payload?.cause;
        },
        setInboxMessages(state, action: PayloadAction<IMessagesOptions>) {
            state.option = 'inbox';
            state.messages = state.messages.filter(
                (m) => m.recepient === action.payload.username
            );
        },
        setOutboxMessages(state, action: PayloadAction<IMessagesOptions>) {
            state.option = 'outbox';
            state.messages = state.messages.filter(
                (m) => m.author === action.payload.username
            );
        },
    },
});

export default messageSlice.reducer;
