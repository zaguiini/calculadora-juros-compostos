import { ReportItem } from "./calculator";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Box } from "@chakra-ui/layout";
import { useEffect, useRef } from "react";

const numberFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
});

interface ReportProps {
  report: ReportItem[];
}

const TableHeading: typeof Th = (props) => (
  <Th {...props} backgroundColor="blue.900" position="sticky" top="0" />
);

export const Report: React.FC<ReportProps> = ({ report }) => {
  const tableBody = useRef<HTMLTableSectionElement | null>(null);

  useEffect(() => {
    const node = tableBody.current?.lastChild;

    if (node) {
      (node as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  }, [report]);

  return (
    <Box marginY={8}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <TableHeading>Mês</TableHeading>
            <TableHeading>Total investido</TableHeading>
            <TableHeading>Contribuição mensal</TableHeading>
            <TableHeading>Dividendos</TableHeading>
            <TableHeading>Total acumulado</TableHeading>
          </Tr>
        </Thead>
        <Tbody ref={tableBody}>
          {report.map(
            ({
              aggregateMonthlyContribution,
              dividends,
              equity,
              invested,
              month,
            }) => (
              <Tr key={month}>
                <Td>{month}</Td>
                <Td>{numberFormatter.format(invested)}</Td>
                <Td>{numberFormatter.format(aggregateMonthlyContribution)}</Td>
                <Td>{numberFormatter.format(dividends)}</Td>
                <Td>{numberFormatter.format(equity)}</Td>
              </Tr>
            ),
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
