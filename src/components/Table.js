import React from "react"
import "./Table.css"
import numeral from "numeral"

function Table({ countries }) {
  const sortedCountries = countries.sort((a, b) => b.cases - a.cases)
  return (
    <div className="table">
      {sortedCountries.map((country, index) => (
        <tr key={index} className="trs">
          <td className="tds">{country.name}</td>

          <td className="tds">
            <strong>{numeral(country.cases).format()}</strong>
          </td>
        </tr>
      ))}
    </div>
  )
}

export default Table
