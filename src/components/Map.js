import React from "react"
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet"
import "./Map.css"
import casesColors from "../common"
import numeral from "numeral"

const showDataOnMap = (data, casesType) => {
  return data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesColors[casesType].hex}
      fillColor={casesColors[casesType].hex}
      radius={Math.sqrt(country[casesType]) * casesColors[casesType].multiplier}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-name">country: {country.country}</div>
          <div className="info-confirmed">
            cases: {numeral(country.cases).format()}
          </div>
          <div className="info-recovered">
            recovered: {numeral(country.recovered).format()}
          </div>
          <div className="info-deaths">
            deaths: {numeral(country.deaths).format()}
          </div>
        </div>
      </Popup>
    </Circle>
  ))
}

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map
