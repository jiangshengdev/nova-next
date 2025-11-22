import { type InjectionKey, type Ref } from 'vue';
import { type Language } from '../types/language';

export const themeKey = Symbol('theme') as InjectionKey<Ref<string>>;
export const languageKey = Symbol('language') as InjectionKey<Ref<Language>>;
