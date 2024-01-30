import * as RadioGroup from "@radix-ui/react-radio-group";
import { SwitchRaw } from "@/components/form/switch";
import ReactDatePicker from "react-datepicker";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/form/datepicker.css";
import { format } from "date-fns";
import clsx from "clsx";

const radio = "bg-white w-5 h-5 rounded-full";
const radioChecked =
  "flex items-center justify-center relative w-full h-full rounded-full bg-day after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-full after:bg-white";
const radioLabel = "ml-2 text-sm leading-5 text-[#94A3B8]";

export default function Announcement(props: {
  date?: string | null;
  milestone?: string;
  onDateChange?: (date: string | null) => void | Promise<void>;
}) {
  const [scheduled, setScheduled] = useState(
    !(props.date === null || props.date === "1970-01-01T00:00:00.000Z")
  );
  const [disabled, setDisabled] = useState(props.date === null ? true : false);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    props.date?.startsWith("197") ? null : props.date!
  );
  const [mode, setMode] = useState<"custom" | "milestone">(
    props.date === "1971-01-01T00:00:00.000Z" ? "milestone" : "custom"
  );
  return (
    <div className="font-secondary min-h-[240px]">
      <p className="font-bold text-white">Announcement</p>
      <p className="text-sm text-[#94A3B8] mb-6">
        The shortlist results will be publicly displayed on the event page and a
        notification email will be sent to the project team members.
      </p>
      <div
        className={clsx({
          "select-none": disabled,
          "opacity-50": disabled,
          "pointer-events-none": disabled,
          "cursor-not-allowed": disabled,
        })}
      >
        <div className="mb-6 text-[#CBD5E1]">
          <SwitchRaw
            label="Scheduled announcement time"
            onCheckedChange={(v) => {
              setScheduled(v);
            }}
            checked={scheduled}
          />
        </div>
        {!scheduled ? (
          <div className="w-fit rounded-[2px] py-2 px-4 bg-[#00FFFF] text-sm leading-5 text-[#003333] cursor-pointer select-none">
            Announce now
          </div>
        ) : (
          <>
            <RadioGroup.Root
              onValueChange={(v) => setMode(v as "milestone" | "custom")}
              defaultValue={mode}
            >
              <div className="pl-9">
                <div className="mb-4 flex items-center">
                  <RadioGroup.Item
                    className={radio}
                    value="milestone"
                    id="milestone"
                  >
                    <RadioGroup.Indicator className={radioChecked} />
                  </RadioGroup.Item>
                  <label className={radioLabel} htmlFor="milestone">
                    Announce shortlist according to the milestone time (
                    {format(new Date(props.milestone!), "yyyy/MM/dd")})
                  </label>
                </div>
                <div className="mb-4 flex items-center">
                  <RadioGroup.Item
                    className={radio}
                    value="custom"
                    id="custom"
                    onChange={(e) => console.log(e)}
                  >
                    <RadioGroup.Indicator className={radioChecked} />
                  </RadioGroup.Item>
                  <label className={radioLabel} htmlFor="custom">
                    Schedule an announcement time
                  </label>
                </div>
              </div>
            </RadioGroup.Root>
            {mode === "custom" && (
              <div className="pl-[64px] flex items-center">
                <p className={`${radioLabel} mr-5`}>Set time to</p>
                <div className="relative px-2 w-[240px] text-[14px] bg-night block body-3 rounded-sm text-white border border-midnight hover:!border-day focus:!border-day focus:outline-none transition-colors">
                  <ReactDatePicker
                    dateFormat="yyyy/MM/dd"
                    wrapperClassName="w-full"
                    calendarClassName="!flex"
                    minDate={new Date()}
                    className="w-full bg-white/0 h-10 outline-none"
                    placeholderText="Click to select a date"
                    selected={selectedDate ? new Date(selectedDate) : null}
                    onChange={(date) => {
                      setSelectedDate(date ? date.toISOString() : null);
                    }}
                  />
                  <CalendarIcon
                    className="text-grey-500 absolute right-2 top-[10px] pointer-events-none"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
