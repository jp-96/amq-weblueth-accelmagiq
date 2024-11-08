import { TypedDispatcher, EventDispatcher, ServiceHelper } from "@weblueth/gattbuilder";

/**
 * @hidden
 */
export enum QuatEstimateCharacteristic {
    QuatEstimate = 'e95dca4b-251d-470a-a062-fa1922dfa9a8',
}

/**
 * Events raised by the QuatEstimate service
 */
export interface QuatEstimateEvents {
    /**
     * @hidden
     */
    newListener: keyof QuatEstimateEvents;
    /**
     * @hidden
     */
    removeListener: keyof QuatEstimateEvents;
    /**
     * QuatEstimate changed event
     */
    quatEstimateChanged: Quaternion;
}

const quatEstimateChanged = 'quatEstimateChanged';

/**
 * QuatEstimate Service
 */
export class QuatEstimateService extends (EventDispatcher as new () => TypedDispatcher<QuatEstimateEvents>) {

    /**
     * @hidden
     */
    public static uuid = "e95d0753-251d-470a-a062-fa1922dfa9a8";
    /**
     * @hidden
     */
    public static async create(service: BluetoothRemoteGATTService): Promise<QuatEstimateService> {
        const bluetoothService = new QuatEstimateService(service);
        await bluetoothService.init();
        return bluetoothService;
    }

    private helper: ServiceHelper;

    /**
     * @hidden
     */
    constructor(service: BluetoothRemoteGATTService) {
        super();
        this.helper = new ServiceHelper(service, this as any);
    }

    private async init() {
        await this.helper.handleListener(
            quatEstimateChanged,
            QuatEstimateCharacteristic.QuatEstimate,
            this.QuatEstimateHandler.bind(this)
        );
    }

    /**
     * Event handler: QuatEstimate changed
     */
    private QuatEstimateHandler(event: Event) {
        const view = (event.target as BluetoothRemoteGATTCharacteristic).value!;
        this.dispatchEvent(quatEstimateChanged, parseQuatEstimateChanged(view));
    }

    /**
     * Read QuatEstimate
     */
    public async readQuatEstimate(): Promise<Quaternion> {
        const view = await this.helper.getCharacteristicValue(QuatEstimateCharacteristic.QuatEstimate);
        return parseQuatEstimateChanged(view);
    }

}

export type Quaternion = {
    w: number;
    x: number;
    y: number;
    z: number;
}

function parseQuatEstimateChanged(data: DataView) {
    return {
        w: data.getInt16(0, true) / 10000.0,
        x: data.getInt16(2, true) / 10000.0,
        y: data.getInt16(4, true) / 10000.0,
        z: data.getInt16(6, true) / 10000.0
    };
}
