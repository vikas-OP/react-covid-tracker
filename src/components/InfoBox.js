import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
import "./InfoBox.css"
import numeral from "numeral"

const printModel = (num) => (num ? `+${numeral(num).format("0.0a")}` : "+0")

function InfoBox({ title, cases, total, active, isRed, onClick }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={onClick}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {printModel(cases)}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          Total: {printModel(total)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
