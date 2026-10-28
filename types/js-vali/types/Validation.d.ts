type RuleConfigMap = {
    required: {
        error?: string;
    };
    isString: {
        error?: string;
    };
    isAlpha: {
        error?: string;
    };
    selectRadio: {
        error?: string;
    };
    selectCheckBox: {
        params?: {
            min?: number;
            max?: number;
        };
        error?: string;
    };
    isNumber: {
        error?: string;
    };
    isInteger: {
        error?: string;
    };
    isDecimal: {
        error?: string;
    };
    isBoolean: {
        error?: string;
    };
    lenMin: {
        params: {
            min: number;
        };
        error?: string;
    };
    lenMax: {
        params: {
            max: number;
        };
        error?: string;
    };
    isArray: {
        error?: string;
    };
    differentTo: {
        params: {
            to: string | number;
        };
        error?: string;
    };
    equalTo: {
        params: {
            to: string | number;
        };
        error?: string;
    };
    isEmail: {
        error?: string;
    };
    valitedDate: {
        error?: string;
    };
    uploadFile: {
        error?: string;
    };
    sizeFile: {
        params: {
            min?: number;
            max?: number;
            unit?: "B" | "KB" | "MB";
        };
        error?: string;
    };
    typeFile: {
        params: {
            types: string[];
        };
        error?: string;
    };
    isURL: {
        error?: string;
    };
    notUse: {
        error?: string;
    };
    isColor: {
        error?: string;
    };
};
type Validation = Partial<RuleConfigMap>;
export default Validation;
