import { convertToId } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

export default function BasicField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: SetState<string>;
}) {
  return (
    <Label
      htmlFor={convertToId(name)}
      className="overflow-none relative flex flex-col items-start gap-2 rounded-md"
    >
      <span>{name}</span>
      <Input
        id={convertToId(name)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Label>
  );
}
