import { Checkbox } from "@material-tailwind/react";
import { ElementType } from "react";

function OptionCard({
  Icon,
  text,
  checked,
  event,
  containerStyles,
}: {
  Icon: ElementType;
  text: string;
  checked: boolean;
  event: () => void;
  containerStyles: string;
}) {
  return (
    <div className={`flex items-center ${containerStyles}`}>
      <div className="flex">
        <Icon className="h-5 w-5 stroke-cusDarkViolet " />
        <span className="text-sm text-cusDarkGray pl-1">{text}</span>
      </div>
      <Checkbox
        checked={checked}
        onChange={event}
        crossOrigin={"true"}
        className="h-4 w-4 rounded-full"
      />
    </div>
  );
}

export default OptionCard;
