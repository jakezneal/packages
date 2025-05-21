import { type Component, type Directive } from 'vue';

type Stub = boolean | Component | Directive;
export type Stubs = Record<string, Stub> | Array<string>;
