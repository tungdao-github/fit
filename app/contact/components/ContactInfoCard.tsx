import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";

type ContactInfoLine = {
  label: string;
  href?: string;
};

type ContactInfoCardProps = {
  icon: "location" | "phone" | "mail";
  title: string;
  content: ContactInfoLine[];
  variant: "red" | "navy";
  backgroundImage?: string;
};

export default function ContactInfoCard({
  icon,
  title,
  content,
  variant,
  backgroundImage,
}: ContactInfoCardProps) {
  const bgColor =
    variant === "red"
      ? "bg-gradient-to-br from-[#b71c4c] to-[#1c2e46]"
      : "bg-gradient-to-br from-[#1c2e46] to-[#0f1a2e]";

  const Icon =
    icon === "location"
      ? HiOutlineLocationMarker
      : icon === "phone"
        ? HiOutlinePhone
        : HiOutlineMail;

  return (
    <div className="group relative rounded-2xl p-8 md:p-10 text-center text-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 cursor-default min-h-[220px] flex flex-col justify-center">
      {/* Background Image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${bgColor} ${backgroundImage ? "opacity-85" : "opacity-100"}`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-center mb-5">
          <div className="bg-white/15 backdrop-blur-sm rounded-full p-4 border border-white/20 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-white/25">
            <Icon className="w-7 h-7" />
          </div>
        </div>

        <h3 className="text-lg font-bold mb-4 tracking-wide">
          {title}
        </h3>

        <div className="space-y-1.5">
          {content.map((line, index) => (
            <p key={index} className="text-sm leading-relaxed text-white/90">
              {line.href ? (
                <a
                  href={line.href}
                  className="hover:text-white hover:underline transition-colors duration-200"
                >
                  {line.label}
                </a>
              ) : (
                line.label
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
    </div>
  );
}
