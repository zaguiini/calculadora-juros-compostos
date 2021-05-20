import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { CalculateCompoundInterestParams } from "./calculator";

const toInt = (value: FormDataEntryValue | null) =>
  parseInt(value as string, 10);

const toFloat = (value: FormDataEntryValue | null) =>
  parseFloat(value as string);

interface FormProps {
  onSubmit(values: CalculateCompoundInterestParams): void;
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    onSubmit({
      initialEquity: toInt(formData.get("initialEquity")),
      monthlyContribution: toInt(formData.get("monthlyContribution")),
      yearlyInterestRate: toInt(formData.get("yearlyInterestRate")),
      monthlyDividendRate: toFloat(formData.get("monthlyDividendRate")),
      years: toInt(formData.get("years")),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <FormControl id="initialEquity">
          <FormLabel>Patrimônio inicial</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input required type="number" name="initialEquity" />
          </InputGroup>
        </FormControl>
        <FormControl id="monthlyContribution">
          <FormLabel>Contribuição mensal</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input required type="number" name="monthlyContribution" />
          </InputGroup>
        </FormControl>
      </Grid>
      <Grid
        templateColumns="repeat(3, 1fr)"
        marginTop={4}
        marginBottom={4}
        gap={6}
      >
        <FormControl id="yearlyInterestRate">
          <FormLabel>Taxa anual</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="%"
            />
            <Input required type="number" name="yearlyInterestRate" />
          </InputGroup>
        </FormControl>
        <FormControl id="monthlyDividendRate">
          <FormLabel>Taxa mensal de dividendos</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="%"
            />
            <Input
              required
              type="number"
              name="monthlyDividendRate"
              step="0.01"
            />
          </InputGroup>
        </FormControl>
        <FormControl id="years">
          <FormLabel>Anos</FormLabel>
          <Input required type="number" name="years" />
        </FormControl>
      </Grid>
      <Button colorScheme="blue" type="submit" size="lg" isFullWidth>
        Calcular
      </Button>
    </form>
  );
};
