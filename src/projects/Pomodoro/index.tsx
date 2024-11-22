import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faForwardStep } from "@fortawesome/free-solid-svg-icons";
// custom hooks
import { useSetTimer } from "./hooks/useSetTimer";
import { useSetSessionTime } from "./hooks/useSetSessionTime";
import { useWatchSessionStep } from "./hooks/useWatchSessionStep";

import "./style.css";

export type mySessionType = "work" | "short br"| "long br";

function Pomodoro() {
    const FULL_SESSION: mySessionType[] = ["work", "short br", "work", "short br", "work", "short br", "work", "short br", "long br"];
    // [minutes, seconds]
    const [timer, setTimer] = useState([0, 10]);
    const [sessionNumber, setSessionNumber] = useState(1);
    const [sessionStep, setSessionStep] = useState(0);
    const [sessionType, setSessionType] = useState<mySessionType>("work");
    const [isTimerRun, setIsTimerRun] = useState(false);
    
    // set timer
    useSetTimer(isTimerRun, setTimer, setIsTimerRun, setSessionStep);
    // set session time
    useSetSessionTime(sessionType, setTimer);
    // wath session step change
    useWatchSessionStep(sessionStep, FULL_SESSION, setSessionStep, setSessionNumber, setSessionType);

    function convertToTime(s: number[]) {
        const mins = String(s[0]);
        const secs = s[1] < 10 ? `0${s[1]}` : `${s[1]}`
        return [mins, secs];
    }

    function clickPlayHandler() {
        setIsTimerRun(!isTimerRun);
    };

    function handleResetClick() {
        setIsTimerRun(false);
        if (sessionType === "work") {
            setTimer([0, 10])
        } else if (sessionType === "short br") {
            setTimer([0, 5])
        } else {
            setTimer([0, 7])
        }
    };

    function handleNextClick() {
        setSessionStep(prevSessionStep => prevSessionStep + 1);
        setIsTimerRun(false);
    };

    const time = convertToTime(timer);

    return (
        <div className="pomodoro">
            <h4>Session {sessionNumber} of 4 ({sessionType === "work" ? "focus time" : sessionType === "short br" ? "short break" : "long break"})</h4>
            <div className="pomodoro__timer">
                <span>{time[0]}</span> : <span>{time[1]}</span>
            </div>
            <div className="pomodoro__controls">
                <button
                    className="pomodoro__restart-btn"
                    disabled={!isTimerRun}
                    onClick={handleResetClick}><FontAwesomeIcon icon={faRotateRight} /></button>
                <button
                    className="pomodoro__play-btn"
                    onClick={clickPlayHandler}>{isTimerRun ? "Pause" : "Start"}</button>
                <button
                    className="pomodoro__forward-btn"
                    disabled={!isTimerRun}
                    onClick={handleNextClick}><FontAwesomeIcon icon={faForwardStep} /></button>
            </div>
        </div>
    )
}

export default Pomodoro;