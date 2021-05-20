export interface CalculateCompoundInterestParams {
  yearlyInterestRate: number;
  years: number;
  initialEquity: number;
  monthlyContribution: number;
  monthlyDividendRate: number;
}

export interface ReportItem {
  month: number;
  equity: number;
  invested: number;
  dividends: number;
  aggregateMonthlyContribution: number;
}

export const calculateCompoundInterest = ({
  years,
  yearlyInterestRate,
  initialEquity,
  monthlyContribution,
  monthlyDividendRate: decimalMonthlyDividendRate,
}: CalculateCompoundInterestParams) => {
  const monthlyInterestRate = yearlyInterestRate / 12 / 100;
  const monthlyDividendRate = decimalMonthlyDividendRate / 100;

  const baseArray: ReportItem[] = new Array(years * 12 + 1).fill(null);

  return baseArray.reduce<ReportItem[]>(
    (acc, _, index) => {
      if (index === 0) {
        return acc;
      }

      const lastMonth = acc[index - 1];

      const dividends = lastMonth.equity * monthlyDividendRate;

      const aggregateMonthlyContribution = monthlyContribution + dividends;

      const currentMonthInterest = lastMonth.equity * monthlyInterestRate;

      const newEquity =
        lastMonth.equity + aggregateMonthlyContribution + currentMonthInterest;

      acc.push({
        month: index,
        equity: newEquity + dividends,
        dividends,
        aggregateMonthlyContribution,
        invested: initialEquity + monthlyContribution * index,
      });

      return acc;
    },
    [
      {
        month: 0,
        equity: initialEquity,
        dividends: 0,
        invested: initialEquity,
        aggregateMonthlyContribution: monthlyContribution,
      },
    ],
  );
};
