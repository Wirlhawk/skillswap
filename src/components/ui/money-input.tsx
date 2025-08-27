/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useReducer } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"; // ShadCN UI import
import { Input } from "../ui/input"; // ShadCN UI Input
import { UseFormReturn } from "react-hook-form";

type TextInputProps = {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder: string;
};

// Indonesian currency config (without decimals)
const moneyFormatter = Intl.NumberFormat("id-ID", {
    currency: "IDR",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 0, // No decimals
    maximumFractionDigits: 0, // No decimals
});

export default function MoneyInput(props: TextInputProps) {
    const initialValue = props.form.getValues()[props.name]
        ? moneyFormatter.format(props.form.getValues()[props.name])
        : "";

    const [value, setValue] = useReducer((_: any, next: string) => {
        const digits = next.replace(/\D/g, ""); // Remove non-numeric characters
        return moneyFormatter.format(Number(digits)); // Format as currency without decimals
    }, initialValue);

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, ""); // Extract only numbers
        const realValue = Number(digits); // Keep it as an integer
        realChangeFn(realValue); // Pass the integer value to react-hook-form
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                field.value = value;
                const _change = field.onChange;

                return (
                    <FormItem>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={props.placeholder}
                                type="text"
                                {...field}
                                onChange={(ev) => {
                                    setValue(ev.target.value);
                                    handleChange(_change, ev.target.value);
                                }}
                                value={value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}