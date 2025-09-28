"use client"

import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

interface CalendarProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  placeholderText?: string;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ selected, onChange, className, placeholderText = "Select a date", ...props }, ref) => {
    const CustomInput = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(
      ({ value, onClick }, inputRef) => (
        <button
          className={cn(
            "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onClick={onClick}
          ref={inputRef}
        >
          {value ? value : placeholderText}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </button>
      )
    );
    CustomInput.displayName = "CustomInput";

    return (
      <div ref={ref} className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          customInput={<CustomInput />}
          dateFormat="MMMM d, yyyy"
          showPopperArrow={false}
          dropdownMode="select"
          showMonthDropdown
          showYearDropdown
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          className="w-full"
          calendarClassName="shadow-lg rounded-lg border border-gray-200 bg-white p-2"
          dayClassName={() => "text-sm p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"}
          popperClassName="z-50"
          {...props}
        />
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };