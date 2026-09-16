import { useState } from 'react';
import type { OperationType } from '../types/types';
import { calculateService } from '../../services/calculator/api';

const symbolMap: Record<string, string> = {
  add: '+',
  subtract: '-',
  multiply: '×',
  divide: '÷',
  power: '^',
  sqrt: '√',
  percentage: '%'
};

export const useCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operation, setOperation] = useState<OperationType | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const clearAll = () => {
        setDisplay('0');
        setFirstOperand(null);
        setOperation(null);
        setWaitingForSecondOperand(false);
        setErrorMessage(null);
    };

    const inputDigit = (digit: string) => {
        if (waitingForSecondOperand) {
            setDisplay(digit);
            setWaitingForSecondOperand(false);
        } else {
            if (display === '0') {
                setDisplay(digit);
            } else if (display === '-0') {
                setDisplay('-' + digit);
            } else {
                setDisplay(display + digit);
            }
        }
    };

    const inputDecimal = () => {
        if (waitingForSecondOperand) {
            setDisplay('0.');
            setWaitingForSecondOperand(false);
            return;
        }
        if (display === '-') {
            setDisplay('-0.');
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperator = async (nextOperation: OperationType) => {
        if (loading) return;
        if (display === '-') return;

        if (nextOperation === 'subtract' && display === '0' && firstOperand === null) {
            setDisplay('-');
            return;
        }

        if (nextOperation === 'subtract' && waitingForSecondOperand) {
            setDisplay('-');
            setWaitingForSecondOperand(false);
            return;
        }

        if (waitingForSecondOperand) {
            setOperation(nextOperation);
            return;
        }

        const inputValue = parseFloat(display);
        if (isNaN(inputValue)) return;

        if (nextOperation === 'sqrt') {
            setLoading(true);
            setErrorMessage(null);
            try {
                const result = await calculateService('sqrt', inputValue);
                setDisplay(String(result));
                setFirstOperand(result);
                setWaitingForSecondOperand(true);
            } catch (err: any) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
            return;
        }

        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operation) {
            setLoading(true);
            setErrorMessage(null);
            try {
                const result = await calculateService(operation, firstOperand, inputValue);
                setFirstOperand(result);
                setDisplay(String(result));
            } catch (err: any) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        }

        setWaitingForSecondOperand(true);
        setOperation(nextOperation);
    };

    const handleEquals = async () => {
        if (!operation || firstOperand === null || display === '-') return;
        const inputValue = parseFloat(display);
        if (isNaN(inputValue)) return;

        setLoading(true);
        setErrorMessage(null);

        try {
            const result = await calculateService(operation, firstOperand, inputValue);
            setDisplay(String(result));
            setFirstOperand(null);
            setOperation(null);
            setWaitingForSecondOperand(false);
        } catch (err: any) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        display,
        firstOperand,
        operation,
        symbolMap,
        loading,
        errorMessage,
        inputDigit,
        inputDecimal,
        handleOperator,
        handleEquals,
        clearAll
    };
};