import { useEffect } from "react";

export function useSetTimer(
            isTimerRun: boolean,
            setTimer: React.Dispatch<React.SetStateAction<number[]>>,
            setIsTimerRun: React.Dispatch<React.SetStateAction<boolean>>,
            setSessionStep: React.Dispatch<React.SetStateAction<number>>) {
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isTimerRun) {
            timer = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer[1] - 1 < 0) {
                        const newMins = prevTimer[0] - 1;
                        if (newMins < 0) {
                            setIsTimerRun(false);
                            setSessionStep(prevSessionStep => prevSessionStep + 1);
                            return [0, 0];
                        }
                        return [newMins, 59]
                    } else {
                        return [prevTimer[0], prevTimer[1] - 1]
                    }
                })
                
            }, 1000);
        }
        
        return () => {
            clearInterval(timer)
        }
    }, [isTimerRun]);
}