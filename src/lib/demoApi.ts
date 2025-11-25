type CreditScorePayload = {
  monthlyRevenue: number
  avgOrderValue: number
  paymentHistory: number
  daysPastDue: number
  returns: number
}

export type CreditScoreResponse = {
  score: number
  risk_band: 'Low' | 'Moderate' | 'High'
  recommended_limit: number
  explain: { feature: string; impact: number }[]
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function simulateCreditScore(payload: CreditScorePayload): Promise<CreditScoreResponse> {
  // Simulates calling /api/demo/credit-score
  await wait(500)
  const scoreBase =
    600 +
    payload.paymentHistory * 1.5 -
    payload.daysPastDue * 2 -
    payload.returns * 1.4 +
    Math.log(payload.monthlyRevenue) * 4 +
    Math.log(payload.avgOrderValue) * 3

  const score = Math.max(300, Math.min(850, Math.round(scoreBase / 5)))
  let risk: CreditScoreResponse['risk_band'] = 'High'
  if (score > 700) risk = 'Low'
  else if (score > 580) risk = 'Moderate'

  return {
    score,
    risk_band: risk,
    recommended_limit: Math.round(payload.monthlyRevenue * (risk === 'Low' ? 1.4 : risk === 'Moderate' ? 1.1 : 0.7)),
    explain: [
      { feature: 'DaysPastDue', impact: -payload.daysPastDue / 1.5 },
      { feature: 'AvgOrderValue', impact: payload.avgOrderValue / 8000 },
      { feature: 'PaymentHistory', impact: payload.paymentHistory / 2 },
      { feature: 'Returns', impact: -payload.returns },
    ],
  }
}

export type ForecastPoint = { week: number; actual: number; forecast: number }

export function buildForecastSeries(horizon: number, upliftPercent: number) {
  const length = Math.max(12, Math.min(52, horizon))
  const data: ForecastPoint[] = []
  for (let i = 1; i <= length; i += 1) {
    const base = 420 + Math.sin(i / 3) * 45 + Math.cos(i / 6) * 30
    const actual = Math.round(base + (i < 20 ? 15 : 0))
    const uplift = 1 + upliftPercent / 100
    const forecast = Math.round(actual * uplift + (i > 30 ? i : 0))
    data.push({ week: i, actual, forecast })
  }
  return data
}
