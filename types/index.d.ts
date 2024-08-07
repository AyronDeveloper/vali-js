declare module 'js-vali' {
    export function formStart(): void;
    
    export function formVali(val: any, validations: string[]): void;
    
    export function customVali(name: string, validation: boolean, result?: boolean): void;
    
    export function formError(vali: string, message?: string): string;
    
    export function resultError(functionFailed?: () => void, functionSuccess?: () => void): boolean;
    
    export function formFinal(): boolean;
    
    export function globalForm(identifier?: string, name?: string): boolean;
    
    export function globalFinal(identifier: string): boolean;
}