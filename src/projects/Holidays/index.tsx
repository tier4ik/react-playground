import { useState } from "react";
import { useGetCountries } from "./hooks/useGetCountries";
import { useGetHolidays } from "./hooks/useGetHolidays";

function Holidays() {
    const [selectedCountry, setSelectedCountry] = useState("NL");
    
    const [countries, countriesError] = useGetCountries();
    const [holidays, holidaysError] = useGetHolidays(selectedCountry);

    function getHolidays(newCountry: string) {
        setSelectedCountry(newCountry);
    }

    const countriesContent = (
        <select name="countries" value={selectedCountry} onChange={e => getHolidays(e.target.value)}>
            {
                countries?.map(country => <option value={country["isoCode"]} key={country["name"]}>{country["name"]}</option>)
            }
        </select>
    );

    const holidaysContent = holidaysError ?
        <h2>{holidaysError}</h2> :
        (
            holidays?.map(holiday => <p key={holiday.id}><span>{holiday.startDate}</span> - <strong>{holiday.name}</strong></p>)
        );
    
        return (
        <div className="holidays">
            { countriesError ? <h2>{countriesError}</h2> :
            <>
                {countriesContent}
                <div className="holidays-container">
                    { holidaysContent }
                </div>
            </>
            }   
        </div>
    )
}

export default Holidays;