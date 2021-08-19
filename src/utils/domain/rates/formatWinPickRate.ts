export const formatWinPickRate = (rate: number )=>
{
  if(rate) return rate.toFixed(1)+ "%"
  return null
}
