import React from 'react';

// Define the type for the Button's props
type ButtonProps = {
  cb?: () => void; // Callback function, optional
  text?: string; // Button text, optional
  color?: string; // Button background color class, optional
  hoverColor?: string; // Hover color class, optional
  textColor?: string; // Text color class, optional
  styles?: string; // Additional styles, optional
  disabled?: boolean; // Disabled state, optional
}

const Button = ({
  cb = () => {},
  text = '',
  color = 'bg-sky-500',
  hoverColor = 'hover:bg-sky-600',
  textColor = 'text-white',
  styles = '',
  disabled = false,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cb();
  };

  return (
    <button
      disabled={disabled}
      className={`${color} ${disabled ? '' : `${hoverColor} hover:cursor-pointer`} ${textColor} rounded-md px-2 py-1 font-medium w-fit ${styles}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
