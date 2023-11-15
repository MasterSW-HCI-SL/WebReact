import React, {FC} from 'react';
import useLogic from "../lib/hooks";


interface HandCaptureProps {
    labelChange: (label: string) => void
}
const HandsCapture: FC<HandCaptureProps> = (props) => {
    const { videoElement, maxVideoWidth, maxVideoHeight, canvasEl } = useLogic(props.labelChange);
    return (
        <div>
            <video
                style={{ display: 'none' }}
                className='video'
                playsInline
                ref={videoElement}
            />
            <canvas ref={canvasEl} width={maxVideoWidth} height={maxVideoHeight} />
        </div>
    );
}

export default HandsCapture;