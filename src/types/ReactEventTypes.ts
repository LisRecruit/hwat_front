import { ChangeEvent, KeyboardEvent, FocusEvent } from 'react';

export type ReactChangeEventType = ChangeEvent<HTMLInputElement>;
export type ReactChangeTextAreaEventType = ChangeEvent<HTMLTextAreaElement>;
export type ReactKeyboardEventType = KeyboardEvent<HTMLInputElement>;
export type ReactFocusEventType = FocusEvent<HTMLInputElement>;