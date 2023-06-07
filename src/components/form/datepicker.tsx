import { useState } from "react";

export function DatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <input
      type="date"
      id="start"
      name="trip-start"
      value="2018-07-22"
      min="2018-01-01"
      max="2018-12-31"
    />
  );
}
