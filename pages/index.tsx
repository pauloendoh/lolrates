import { InferGetServerSidePropsType } from "next"
import React from "react"
import LolRates from "../components/LolRates/LolRates"
import { LolRateDto } from "../interfaces/LolRateDto"
import { LolRateUpdatedAtDto } from "../interfaces/LolRateUpdatedAtDto"
import { apiRoutes } from "./api/apiRoutes"

const IndexPage = ({
  rates,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <LolRates rates={rates} />
}

export const getServerSideProps = async () => {
  const res = await fetch(apiRoutes.lolRates)
  const result = await res.json()
  const rates = result.rates as LolRateDto[]

  const updatedAt = result.updatedAt as LolRateUpdatedAtDto[]

  return {
    props: {
      rates,
      updatedAt,
    },
  }
}

export default IndexPage
