import { useEffect, useState } from "react";
type CountryType = {
    isoCode: string,
    name: {
        language: string,
        text: string
    }[],
    officialLanguage: string[]
}
export function useGetCountries(): [{isoCode: string, name: string}[], string] {
    const [countries, setCountries] = useState<{isoCode: string, name: string}[]>([]);
    const [countriesError, setCountriesError] = useState<string>("");
    useEffect(() => {
        async function getCountries() {
            try {
                const response = await fetch("https://openholidaysapi.org/countries");
                if (response.ok) {
                    const data: CountryType[] = await response.json();
                    const receivedCountries = data.map(country => ({isoCode: country["isoCode"], name: country["name"][0]["text"]}));
                    setCountries(receivedCountries);
                } else {
                    throw Error()
                }
            } catch (error) {
                setCountriesError("Unable to fetch list of countries, please try again later.")
            }           
        }
        getCountries();
    }, [])
    return [countries, countriesError];
}