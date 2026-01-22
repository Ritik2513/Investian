const Badge = ({ label, bgColor, textColor }) => {
  return (
    <span
      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${textColor}`}
    >
      {label}
    </span>
  );
};

export default Badge;
