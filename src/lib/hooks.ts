import { useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import {
    drawConnectors,
    drawLandmarks,
    drawRectangle,
} from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import useKeyPointClassifier from "./useKeyPointClassifier";
import {CONFIGS} from "./constants";
import labels from "./fsm/labels";

const maxVideoWidth = 250;
const maxVideoHeight = 175;

function useLogic(setCurrentLabel: (label: string) => void) {
    const videoElement = useRef<any>(null);
    const hands = useRef<any>(null);
    const camera = useRef<any>(null);
    const canvasEl = useRef(null);
    const handsGesture = useRef<any>([]);

    const { processLandmark } = useKeyPointClassifier();

    // @ts-ignore
    async function onResults(results) {
        if (canvasEl.current) {
            if (results.multiHandLandmarks.length) {
            }
            // @ts-ignore
            const ctx = canvasEl.current.getContext('2d');

            ctx.clearRect(0, 0,canvasEl.current.width, canvasEl.current.height);

            // Draw the flipped video feed
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-canvasEl.current.width, 0);
            ctx.drawImage(results.image, 0, 0, canvasEl.current.width,canvasEl.current.height);
            ctx.restore();

            if (results.multiHandLandmarks) {
                // results.multiHandedness[index].label is where i find the label for the hand
                let currentLabel : Array<String> = ["", ""];
                for (const [index, landmarks] of results.multiHandLandmarks.entries()) {
                    processLandmark(landmarks, results.image).then(
                        (val) => (handsGesture.current[index] = val)
                    );
                    // TODO: Make some label generation here and check if left and right label exists
                    if (results.multiHandedness[index].label.toLowerCase() === "right" && labels.includes(`Left:${CONFIGS.keypointClassifierLabels[handsGesture.current[index]]}`)){
                        currentLabel[0] = `Left:${CONFIGS.keypointClassifierLabels[handsGesture.current[index]]}`;
                    } else if(results.multiHandedness[index].label.toLowerCase() === "left" && labels.includes(`Right:${CONFIGS.keypointClassifierLabels[handsGesture.current[index]]}`)) {
                        currentLabel[1] = `Right:${CONFIGS.keypointClassifierLabels[handsGesture.current[index]]}`;
                    }

                    // @ts-ignore
                    const landmarksX = landmarks.map((landmark) => landmark.x);
                    // @ts-ignore
                    const landmarksY = landmarks.map((landmark) => landmark.y);
                    ctx.fillStyle = '#ff0000';
                    ctx.font = '12px serif';
                    ctx.fillText(
                    `${results.multiHandedness[index].label} : ${CONFIGS.keypointClassifierLabels[handsGesture.current[index]]}`,
                        maxVideoWidth * Math.min(...landmarksX),
                        maxVideoHeight * Math.min(...landmarksY) - 15
                    );

                    drawRectangle(
                        ctx,
                        {
                            xCenter:
                                Math.min(...landmarksX) +
                                (Math.max(...landmarksX) - Math.min(...landmarksX)) / 2,
                            yCenter:
                                Math.min(...landmarksY) +
                                (Math.max(...landmarksY) - Math.min(...landmarksY)) / 2,
                            width: Math.max(...landmarksX) - Math.min(...landmarksX),
                            height: Math.max(...landmarksY) - Math.min(...landmarksY),
                            rotation: 0,
                            // @ts-ignore
                            rectId: 13,
                        },
                        {
                            fillColor: 'transparent',
                            color: '#ff0000',
                            lineWidth: 1,
                        }
                    );
                    /*
                    drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
                        color: '#00ffff',
                        lineWidth: 1,
                    });
                    drawLandmarks(ctx, landmarks, {
                        color: '#ffff29',
                        lineWidth: 1,
                    });

                     */
                }
                const label : string = assembleLabel(currentLabel);
                setCurrentLabel(label);
            }
            ctx.restore();
        }
    }

    const assembleLabel = (labelArray: Array<String>) => {
        let label = "";
        if (labelArray[0] === "" && labelArray[1] === ""){
            return "";
        }
        for (let i = 0; i < labelArray.length; i++){
            label += labelArray[i];
            if (i === 0){
                label += " - ";
            }
        }
        return label;
    }

    const loadHands = () => {
        hands.current = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
        });
        hands.current.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.97,
            minTrackingConfidence: 0.5,
        });
        hands.current.onResults(onResults);
    };

    useEffect(() => {
        async function initCamara() {
            camera.current = new Camera(videoElement.current, {
                onFrame: async () => {
                    await hands.current.send({ image: videoElement.current });
                },
                width: maxVideoWidth,
                height: maxVideoHeight,
            });
            camera.current.start();
        }

        initCamara();
        loadHands();
    }, []);

    return { maxVideoHeight, maxVideoWidth, canvasEl, videoElement };
}

export default useLogic;