import type { ChangeEvent, KeyboardEvent, FocusEvent, DragEvent } from 'react';

export type ReactChangeEventType = ChangeEvent<HTMLInputElement>;
export type ReactChangeTextAreaEventType = ChangeEvent<HTMLTextAreaElement>;
export type ReactKeyboardEventType = KeyboardEvent<HTMLInputElement>;
export type ReactFocusEventType = FocusEvent<HTMLInputElement>;
export type ReactDragEventType = DragEvent<HTMLDivElement>;