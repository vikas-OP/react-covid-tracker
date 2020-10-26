import React, { useState, useEffect } from "react"
import { FormControl } from "@material-ui/core"
import { Select, MenuItem, Card, CardContent } from "@material-ui/core"
import "./App.css"
import InfoBox from "./components/InfoBox"
import Map from "./components/Map"
import Table from "./components/Table"
import LineGraph from "./components/LineGraph"
import "leaflet/dist/leaflet.css"

function App() {
  const [country, setCountry] = useState("worldwide")
  const [countries, setCountries] = useState([])
  const [countryInfo, setCountryInfo] = useState({})
  const [casesType, setCasesType] = useState("cases")
  const [mapCountries, setMapCountries] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 })
  const [mapZoom, setMapZoom] = useState(3)

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((res) => {
        setMapCountries(res)
        setCountries(
          res.map((item) => {
            return {
              name: item.country,
              code: item.countryInfo.iso2,
              cases: item.cases,
              lat: item.countryInfo.lat,
              lng: item.countryInfo.long,
            }
          })
        )
      })
  }, [])

  useEffect(() => {
    let url
    if (country === "worldwide") {
      url = `https://disease.sh/v3/covid-19/all`
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${country}`
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => setCountryInfo(res))
  }, [country])

  useEffect(() => {
    if (country === "worldwide") {
      return
    }
    console.log(country)
    let presentCountry = countries.find((item) => item.code === country)
    console.log(presentCountry)

    setMapZoom(4)
    setMapCenter({
      lat: presentCountry.lat,
      lng: presentCountry.lng,
    })
  }, [country, countries])

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.code}>
                  {country.name.slice(0, 1).toUpperCase() +
                    country.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            isRed
            active={casesType === "cases"}
            onClick={() => setCasesType("cases")}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            active={casesType === "recovered"}
            onClick={() => setCasesType("recovered")}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            isRed
            active={casesType === "deaths"}
            onClick={() => setCasesType("deaths")}
          />
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={[...countries]} />
          <h3 style={{ marginTop: "20px" }}>
            {country === "worldwide" ? "Worldwide" : countryInfo.country}{" "}
            {casesType.slice(0, 1).toUpperCase() + casesType.slice(1)}{" "}
          </h3>
          <LineGraph country={country} casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
