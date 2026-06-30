import { PressKeysBean } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PressKeysItem";
export class PressKeysBeanViewModel {
    private isScientificMode: boolean = false;
    private isTrigMode: boolean = false;
    /**
     * Key array data.
     */
    getPressKeys(): Array<Array<PressKeysBean>> {
        if (this.isTrigMode) {
            return this.getTrigKeys();
        }
        else if (this.isScientificMode) {
            return this.getScientificKeys();
        }
        else {
            return this.getBasicKeys();
        }
    }
    /**
     * Set mode.
     */
    setMode(scientificMode: boolean, trigMode: boolean): void {
        this.isScientificMode = scientificMode;
        this.isTrigMode = trigMode;
    }
    /**
     * Toggle scientific mode.
     */
    toggleScientificMode(): void {
        this.isScientificMode = !this.isScientificMode;
        this.isTrigMode = false;
    }
    /**
     * Get scientific mode status.
     */
    getScientificMode(): boolean {
        return this.isScientificMode;
    }
    /**
     * Get trig mode status.
     */
    getTrigMode(): boolean {
        return this.isTrigMode;
    }
    /**
     * Basic keys layout.
     */
    private getBasicKeys(): Array<Array<PressKeysBean>> {
        return [
            [
                new PressKeysBean(0, '32vp', '32vp', 'clean', { "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '7'),
                new PressKeysBean(1, '19vp', '43vp', '4'),
                new PressKeysBean(1, '19vp', '43vp', '1'),
                new PressKeysBean(1, '25vp', '43vp', '%')
            ],
            [
                new PressKeysBean(0, '32vp', '32vp', 'div', { "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '8'),
                new PressKeysBean(1, '19vp', '43vp', '5'),
                new PressKeysBean(1, '19vp', '43vp', '2'),
                new PressKeysBean(1, '19vp', '43vp', '0')
            ],
            [
                new PressKeysBean(0, '32vp', '32vp', 'mul', { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '9'),
                new PressKeysBean(1, '19vp', '43vp', '6'),
                new PressKeysBean(1, '19vp', '43vp', '3'),
                new PressKeysBean(1, '19vp', '43vp', '.')
            ],
            [
                new PressKeysBean(1, '19vp', '43vp', '('),
                new PressKeysBean(1, '19vp', '43vp', ')'),
                new PressKeysBean(1, '19vp', '43vp', '^'),
                new PressKeysBean(0, '24vp', '24vp', 'min', { "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(0, '32vp', '32vp', 'add', { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            [
                new PressKeysBean(0, '30.48vp', '20vp', 'del', { "id": 16777255, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(0, '32vp', '32vp', 'equ', { "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ]
        ];
    }
    /**
     * Scientific keys layout.
     */
    private getScientificKeys(): Array<Array<PressKeysBean>> {
        return [
            // Row 1: Functions
            [
                new PressKeysBean(1, '25vp', '43vp', 'sqrt'),
                new PressKeysBean(1, '25vp', '43vp', 'log'),
                new PressKeysBean(1, '25vp', '43vp', 'ln'),
                new PressKeysBean(1, '25vp', '43vp', 'fact'),
                new PressKeysBean(1, '25vp', '43vp', 'exp')
            ],
            // Row 2: More functions + parentheses
            [
                new PressKeysBean(1, '25vp', '43vp', 'reciprocal'),
                new PressKeysBean(1, '19vp', '43vp', '('),
                new PressKeysBean(1, '19vp', '43vp', ')'),
                new PressKeysBean(1, '19vp', '43vp', '^'),
                new PressKeysBean(1, '25vp', '43vp', '%')
            ],
            // Row 3: Numbers col (7-4-1) + operators
            [
                new PressKeysBean(0, '32vp', '32vp', 'clean', { "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '7'),
                new PressKeysBean(1, '19vp', '43vp', '4'),
                new PressKeysBean(1, '19vp', '43vp', '1'),
                new PressKeysBean(0, '32vp', '32vp', 'div', { "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            // Row 4: Numbers col (8-5-2) + operators
            [
                new PressKeysBean(0, '30.48vp', '20vp', 'del', { "id": 16777255, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '8'),
                new PressKeysBean(1, '19vp', '43vp', '5'),
                new PressKeysBean(1, '19vp', '43vp', '2'),
                new PressKeysBean(0, '32vp', '32vp', 'mul', { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            // Row 5: Numbers col (9-6-3) + operators
            [
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(1, '19vp', '43vp', '9'),
                new PressKeysBean(1, '19vp', '43vp', '6'),
                new PressKeysBean(1, '19vp', '43vp', '3'),
                new PressKeysBean(0, '24vp', '24vp', 'min', { "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            // Row 6: Bottom row
            [
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(1, '19vp', '43vp', '0'),
                new PressKeysBean(1, '19vp', '43vp', '.'),
                new PressKeysBean(0, '32vp', '32vp', 'add', { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(0, '32vp', '32vp', 'equ', { "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ]
        ];
    }
    /**
     * Trigonometric keys layout.
     */
    private getTrigKeys(): Array<Array<PressKeysBean>> {
        return [
            // Row 1: Trig functions
            [
                new PressKeysBean(1, '25vp', '43vp', 'sin'),
                new PressKeysBean(1, '25vp', '43vp', 'cos'),
                new PressKeysBean(1, '25vp', '43vp', 'tan'),
                new PressKeysBean(1, '25vp', '43vp', 'asin'),
                new PressKeysBean(1, '25vp', '43vp', 'acos')
            ],
            // Row 2: More functions + parentheses
            [
                new PressKeysBean(1, '25vp', '43vp', 'atan'),
                new PressKeysBean(1, '19vp', '43vp', '('),
                new PressKeysBean(1, '19vp', '43vp', ')'),
                new PressKeysBean(1, '19vp', '43vp', '^'),
                new PressKeysBean(1, '25vp', '43vp', '%')
            ],
            // Row 3: Numbers col (7-4-1) + operators
            [
                new PressKeysBean(0, '32vp', '32vp', 'clean', { "id": 16777221, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '7'),
                new PressKeysBean(1, '19vp', '43vp', '4'),
                new PressKeysBean(1, '19vp', '43vp', '1'),
                new PressKeysBean(0, '32vp', '32vp', 'div', { "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            // Row 4: Numbers col (8-5-2) + operators
            [
                new PressKeysBean(0, '30.48vp', '20vp', 'del', { "id": 16777255, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(1, '19vp', '43vp', '8'),
                new PressKeysBean(1, '19vp', '43vp', '5'),
                new PressKeysBean(1, '19vp', '43vp', '2'),
                new PressKeysBean(0, '32vp', '32vp', 'mul', { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            // Row 5: Numbers col (9-6-3) + operators
            [
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(1, '19vp', '43vp', '9'),
                new PressKeysBean(1, '19vp', '43vp', '6'),
                new PressKeysBean(1, '19vp', '43vp', '3'),
                new PressKeysBean(0, '24vp', '24vp', 'min', { "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ],
            // Row 6: Bottom row
            [
                new PressKeysBean(1, '19vp', '43vp', ''),
                new PressKeysBean(1, '19vp', '43vp', '0'),
                new PressKeysBean(1, '19vp', '43vp', '.'),
                new PressKeysBean(0, '32vp', '32vp', 'add', { "id": 16777218, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" }),
                new PressKeysBean(0, '32vp', '32vp', 'equ', { "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.simplecalculator", "moduleName": "entry" })
            ]
        ];
    }
}
let keysModel = new PressKeysBeanViewModel();
export default keysModel as PressKeysBeanViewModel;
