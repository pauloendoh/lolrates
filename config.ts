require("dotenv").config()

export const isProduction = process.env.NODE_ENV === "production"
export const apiURL = process.env.API_URL
