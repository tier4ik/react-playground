import { useEffect, useState } from "react";

type HolidayReceivedType = {
    id: string,
    startDate: string,
    endDate: string,
    type: string,
    name: [
        {
            language: string,
            text: string
        },
        {
            language: string,
            text: string
        }
    ],
    regionalScope: string,
    temporalScope: string,
    nationwide: boolean
}

type HolidayType = {
    id: string,
    startDate: string,
    endDate: string,
    name: string
}

export function useGetHolidays(selectedCountry: string): [HolidayType[], string] {
    const [holidays, setHolidays] = useState<HolidayType[]>([]);
    const [holidaysHandlingError, setHolidaysHandlingError] = useState<string>("");

    useEffect(() => {
        async function retrieveHolidays() {
            try {
                const response = await fetch(`https://openholidaysapi.org/publicholidays?countryIsoCode=${selectedCountry}&validFrom=2024-01-01&validTo=2024-12-31`);
                if (response.ok) {
                    const data: HolidayReceivedType[] = await response.json();
                    
                    setHolidays(data.map(holiday => ({id: holiday.id, startDate: holiday.startDate, endDate: holiday.endDate, name: holiday.name.filter(n => n.language === "EN")[0].text})))
                } else {
                    throw Error()
                }
            } catch (error) {
                setHolidaysHandlingError("Unable to fetch list of holidays, please try again later.")
            }
        }
        retrieveHolidays()
    }, [selectedCountry])
    return [holidays, holidaysHandlingError];
}