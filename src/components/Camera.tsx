import Webcam from "react-webcam";
import {FC} from "react";
import {DeviceInfo} from '../lib/datatypes';


interface CameraProps {
    selectedDevice : DeviceInfo
}

const Camera:FC<CameraProps> = (props) => {
    return (
        <Webcam
            videoConstraints ={{
                width: 1280,
                height: 720,
                facingMode: "user",
                deviceId: props.selectedDevice.deviceId ? { exact: props.selectedDevice.deviceId } : undefined
            }}
        />
    )

}

export default Camera