import {
    select as _select,
    confirm as _confirm,
    text as _text,
    isCancel,
    type ConfirmOptions,
    intro as _intro,
    outro,
    type TextOptions,
} from '@clack/prompts';

type Primitive = Readonly<string | boolean | number>;

export type Option<Value> = Value extends Primitive
    ? { value: Value; label?: string; hint?: string }
    : { value: Value; label: string; hint?: string };

interface SelectOptions<Options extends Option<Value>[], Value> {
    message: string;
    options: Options;
    initialValue?: Value;
}

export const PROMPT_CANCELLED = 'PROMPT_CANCELLED';

function bailIfCancelled<Value>(promptResponse: symbol | Value) {
    if (isCancel(promptResponse)) {
        const error = new Error();
        error.name = PROMPT_CANCELLED;

        throw error;
    }

    return promptResponse;
}

export async function select<Options extends Option<Value>[], Value>(options: SelectOptions<Options, Value>) {
    return bailIfCancelled(await _select(options));
}

export async function confirm(options: ConfirmOptions) {
    return bailIfCancelled(await _confirm(options));
}

export async function text(options: TextOptions) {
    return bailIfCancelled(await _text(options));
}

function intro(value: string) {
    return _intro(`✨ ${value}`);
}

export async function promptScope(run: (payload: { intro: typeof intro; outro: typeof outro }) => Promise<void>) {
    try {
        await run({
            intro,
            outro,
        });
    } catch (e) {
        if (typeof e === 'object' && e && 'name' in e && typeof e.name === 'string') {
            if (e.name === PROMPT_CANCELLED) {
                outro('Cancelled');

                return;
            }

            console.error(e);
        }
    } finally {
    }
}
