import { useEffect } from "react";

import { mySessionType } from "../index";

export function useWatchSessionStep(
            sessionStep: number,
            FULL_SESSION: mySessionType[],
            setSessionStep: React.Dispatch<React.SetStateAction<number>>,
            setSessionNumber: React.Dispatch<React.SetStateAction<number>>,
            setSessionType: React.Dispatch<React.SetStateAction<mySessionType>>) {
    useEffect(() => {
        if (sessionStep >= FULL_SESSION.length) {
            setSessionStep(0);
            setSessionNumber(1);
            return;
        }
        if (sessionStep === 2 || sessionStep === 4 ||sessionStep === 6) {
            setSessionNumber(prevSessionNumber => prevSessionNumber + 1)
        }
        setSessionType(FULL_SESSION[sessionStep])
    }, [sessionStep]);
}