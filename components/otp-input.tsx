import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { InputOTP, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";

const OTPInput = ({
  field,
}: {
  field:
    | ControllerRenderProps<FieldValues, "otp">
    | ControllerRenderProps<FieldValues, "code">;
}) => {
  return (
    <InputOTP maxLength={6} {...field}>
      <div className="flex items-center gap-1 md:gap-3">
        <div>
          <InputOTPSlot index={0} />
        </div>
        <div>
          <InputOTPSlot index={1} />
        </div>
        <div>
          <InputOTPSlot index={2} />
        </div>

        <InputOTPSeparator className="hidden md:flex" />

        <div>
          <InputOTPSlot index={3} />
        </div>
        <div>
          <InputOTPSlot index={4} />
        </div>
        <div>
          <InputOTPSlot index={5} />
        </div>
      </div>
    </InputOTP>
  );
};

export default OTPInput;
