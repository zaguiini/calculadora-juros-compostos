import { Box, Center, Heading } from "@chakra-ui/layout";
import { useState } from "react";
import { Form } from "./Form";
import { calculateCompoundInterest, ReportItem } from "./calculator";
import { Report } from "./Report";

export const App = () => {
  const [report, setReport] = useState<ReportItem[]>([]);

  return (
    <Center>
      <Box
        width="100%"
        maxWidth={1024}
        marginTop={4}
        paddingX={2}
        textAlign="left"
      >
        <Heading>Calculadora de juros compostos</Heading>
        <Box marginTop={4}>
          <Form
            onSubmit={(values) => {
              const compoundInterestReport = calculateCompoundInterest(values);

              setReport(compoundInterestReport);
            }}
          />
        </Box>
        {report.length > 0 && <Report report={report} />}
      </Box>
    </Center>
  );
};
