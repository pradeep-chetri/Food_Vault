import { useEffect, useRef, useState } from "react";

interface EmailOTPInputProps {
    length?: number;
    onComplete?: (otp: string) => void;
}

export default function EmailOTPInput({ length = 6, onComplete }: EmailOTPInputProps) {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current = inputsRef.current.slice(0, length);
    }, [length]);

    const handleChange = (vaule: string, index: number) => {
        if (!/^[0-9a-zA-Z]?/.test(vaule))
            return;

        const newOtp = [...otp];
        newOtp[index] = vaule;
        setOtp(newOtp);

        if (vaule && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newOtp.every((char) => char !== "")) {
            onComplete?.(newOtp.join(""));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if(otp[index] === ""){
                inputsRef.current[index - 1]?.focus();
            }
            else{
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
    }
    };

    return (
        <div className="flex gap-2 justify-center">
            {otp.map((value, i) => (
                <input 
                key={i} 
                ref={(el) => (inputsRef.current[i] = el)} 
                type="text" 
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-10 h-12 text-center text-xl border focus:border-none border-gray-400 rounded focus:outline-2 focus:outline-amber-500"
                />
            ))}
        </div>
    )
}