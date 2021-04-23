import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { InferGetServerSidePropsType } from "next"
import Link from "next/link"
import React from "react"
import Layout from "../components/Layout"
import { LolRateDto } from "../interfaces/LolRateDto"
import { apiRoutes } from "./api/apiRoutes"

const IndexPage = ({
  lolRates,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(lolRates)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>Crazy!</a>
        </Link>
      </p>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Teste</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lolRates.map((rate) => (
            <TableRow key={rate.id}>
              <TableCell>{rate.championName}</TableCell>
              <TableCell>{rate.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(apiRoutes.lolRates)
  const lolRates: LolRateDto[] = await res.json()
  return {
    props: {
      lolRates,
    },
  }
}

export default IndexPage
