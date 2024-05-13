import { HTMLProps } from "react";

export function Textarea({ className = "", ...rest }: HTMLProps<HTMLTextAreaElement>) {
  
  const combinedClassName = `placeholder-black placeholder-opacity-50 bg-gray-200 w-full md:w-auto px-4 py-2 md:px-8 md:py-3 focus:bg-[#C4A1FF] focus:-translate-x-2 focus:-translate-y-2 border-black border-2 rounded-md text-lg outline-none transition-all ${className}`;

  return (
    <div className="bg-black border-black border-r-4 rounded-md">
      <textarea
        className={combinedClassName}
        placeholder="Digite sua tarefa aqui"
        {...rest}
      />
    </div>
  );
}
