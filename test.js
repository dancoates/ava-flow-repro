//@flow
import test from 'ava';

class CustomError extends Error {
    customProperty: string;
    constructor(message: string, customValue: string) {
        super(message);
        this.customProperty = customValue;
    }
}

function throwsCustomError(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new CustomError('message', 'customValue'));
        }, 500);
    });
}

test('Test something', async (tt: AssertContext): Promise<void> => {
    const error = await tt.throws(throwsCustomError());
    tt.is(error.customProperty, 'customValue');
});