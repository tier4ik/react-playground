import { useEffect } from "react";

import { mySessionType } from "../index";

export function useSetSessionTime(sessionType: mySessionType, setTimer: React.Dispatch<React.SetStateAction<number[]>>) {
    useEffect(() => {
        switch (sessionType) {
            case "work":
                setTimer([0, 10]);
                break; 
            case "short br":
                setTimer([0, 5]);
                break; 
            case "long br":
                setTimer([0, 7]);
                break; 
        }
    }, [sessionType]);
}