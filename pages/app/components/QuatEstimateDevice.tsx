import React, { useCallback, useState } from 'react';
import { WbBoundCallback } from '@weblueth/statemachine';
import { DeviceInformation } from '@weblueth/gattbuilder';
import { useWbxActor, WbxCustomEventCallback, WbxDevice, WbxServices } from '@weblueth/react';
import { Quaternion, QuatEstimate, QuatEstimateService, Services } from '../../../src';

const defaultName = "(none)";

export default function QuatEstimateDevice() {
    /**
     * State machine (xstate)
     */
    const [state, send] = useWbxActor();
    const connectionName = state.context.conn.name;

    // xstate actions
    const reset = () => send("RESET");
    const request = () => send("REQUEST");
    const connect = () => send("CONNECT");
    const disconnect = () => send("DISCONNECT");

    // rejectedReason
    if (state.context.rejectedReason.type !== "NONE") {
        console.log("rejectedReason:", state.context.rejectedReason.message);
    }

    // disconnectedReason
    if (state.context.disconnectedReason.type !== "NONE") {
        console.log("disconnectedReason:", state.context.disconnectedReason.message);
    }

    /**
     * Device
     */
    const [name, setName] = useState<string>(defaultName);
    const onDeviceBound: WbBoundCallback<BluetoothDevice> = bound => {
        if (bound.binding) {
            setName(bound.target.name!);
        } else {
            setName(defaultName);
        }
    }

    /**
     * DeviceInformation service
     */
    const [deviceInfo, setDeviceInfo] = useState<DeviceInformation | undefined>();

    const onServicesBound: WbBoundCallback<Services> = async bound => {
        if (bound.binding) {
            console.log(bound.target);
            const info = await bound.target.deviceInformationService?.readDeviceInformation();
            console.log(info);
            setDeviceInfo(info)
        } else {
            setDeviceInfo(undefined);
        }
    };

    /**
     * QuatEstimate service
     */
    const [qw, setQw] = useState<number>(1.0);
    const [qx, setQx] = useState<number>(0.0);
    const [qy, setQy] = useState<number>(0.0);
    const [qz, setQz] = useState<number>(0.0);
    const onQuatEstimateBound: WbBoundCallback<QuatEstimateService> = async bound => {
        if (bound.binding) {
            // bound
        } else {
            // unbound
        }
    };
    const onQuatEstimateChanged: WbxCustomEventCallback<Quaternion> = async event => {
        setQw(event.detail.w);
        setQx(event.detail.x);
        setQy(event.detail.y);
        setQz(event.detail.z);
    };

    return (
        <>
            <WbxDevice onDeviceBound={onDeviceBound} />
            <WbxServices onServicesBound={onServicesBound} />
            <QuatEstimate onServiceBound={onQuatEstimateBound} onQuatEstimateChanged={onQuatEstimateChanged} />
            {connectionName + ": [" + state.toStrings() + "]"}
            <br />
            <button onClick={reset}>RESET</button>
            <button onClick={request}>REQUEST</button>
            <button onClick={connect}>CONNECT</button>
            <button onClick={disconnect}>DISCONNECT</button>
            <br />
            Name: {name} {deviceInfo?.firmwareRevision}
            <br />
            Quat: {qw}, {qx}, {qy}, {qz}
        </>
    );
}
