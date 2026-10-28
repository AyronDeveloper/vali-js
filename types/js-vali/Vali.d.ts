import { default as Validation } from './types/Validation';
declare class Vali {
    private started;
    private count;
    private result;
    private error;
    start(): void;
    validation(value: any, validations: Validation): Vali;
    custom(condition: any, vali?: boolean, error?: string): Vali;
    getValiError(): boolean;
    getMsgError(): string;
    resultVali(): boolean;
}
export declare const jsVali: Vali;
export default Vali;
