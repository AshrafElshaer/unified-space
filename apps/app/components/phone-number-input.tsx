import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";
import * as RPNInputSimple from "react-phone-number-input/input";

import flags from "react-phone-number-input/flags";

import { Button } from "@unified/ui/components/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@unified/ui/components/command";
import { Input, type InputProps } from "@unified/ui/components/inputs/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@unified/ui/components/popover";

import { cn } from "@unified/ui/lib/utils";

export type PhoneInputValue = RPNInput.Value;

type PhoneInputSimpleProps = React.ComponentProps<
	typeof RPNInputSimple.default
>;

const PhoneInputSimple = ({
	className,
	children,
	...props
}: PhoneInputSimpleProps) => (
	<RPNInputSimple.default
		placeholder="Enter a phone number"
		inputComponent={Input}
		{...props}
	/>
);
PhoneInputSimple.displayName = "PhoneInputSimple";

type PhoneInputProps = React.ComponentProps<typeof RPNInput.default>;

const PhoneInput = ({ className, children, ...props }: PhoneInputProps) => (
	<RPNInput.default
		className={cn("flex", className)}
		placeholder={"Enter a phone number"}
		flagComponent={FlagComponent}
		countrySelectComponent={CountrySelect}
		inputComponent={InputComponent}
		{...props}
	/>
);

PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => (
		<Input
			className={cn("!rounded-s-none rounded-e-lg w-full", className)}
			wrapperClassName="w-full"
			{...props}
			inputMode="numeric"
			placeholder={"Enter a phone number"}
			ref={ref}
		/>
	),
);
InputComponent.displayName = "InputComponent";

export type CountrySelectOption = { label: string; value: RPNInput.Country };

export type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: CountrySelectOption[];
};

const CountrySelect = ({
	disabled,
	value,
	onChange,
	options,
}: CountrySelectProps) => {
	const handleSelect = React.useCallback(
		(country: RPNInput.Country) => {
			onChange(country);
		},
		[onChange],
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant={"secondary"}
					className={cn("rounded-e-none rounded-s-lg pl-3 pr-1 flex gap-1")}
					disabled={disabled}
				>
					<span className="flex items-center truncate">
						<div className=" rounded-sm flex w-6 h-4">
							{value && <FlagComponent country={value} countryName={value} />}
						</div>
					</span>
					<ChevronsUpDown className={`h-4 w-4 ${disabled ? "hidden" : ""}`} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[280px] p-0" align="start">
				<Command>
					<CommandInput placeholder="Search country..." />
					<CommandList>
						<CommandEmpty>No country found.</CommandEmpty>
						<CommandGroup>
							{options
								.filter((x) => x.value)
								.map((option) => (
									<CommandItem
										className={"text-sm gap-2"}
										key={option.value}
										onSelect={() => handleSelect(option.value)}
									>
										<FlagComponent
											country={option.value}
											countryName={option.label}
										/>
										<span>{option.label}</span>
										<span className="text-foreground/50">
											{`+${RPNInput.getCountryCallingCode(option.value)}`}
										</span>
										<CheckIcon
											className={`ml-auto h-4 w-4 ${
												option.value === value ? "opacity-100" : "opacity-0"
											}`}
										/>
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country];

	return (
		<span
			className={"inline object-contain w-6 h-4 overflow-hidden rounded-sm"}
		>
			{Flag && <Flag title={countryName} />}
		</span>
	);
};

export { PhoneInput, PhoneInputSimple };
