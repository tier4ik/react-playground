import { useEffect } from "react"

export function useWatchIsVictory(isVictory: boolean) {
    useEffect(() => {
        if (isVictory) {
            alert("POBEDA !!!")
        }
    }, [isVictory])
}