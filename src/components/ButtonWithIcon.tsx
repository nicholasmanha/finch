type ButtonWithIconProps = {
    /** callback function on click */
    cb?: () => void;
    /** text inside button */ 
    text?: string;
    /** Tailwind ClassName */
    bgColor?: `bg-${string}`; 
    /** Tailwind ClassName */
    hoverBgColor?: `hover:bg-${string}`;
    /** Tailwind ClassName */
    textColor?: `text-${string}`;
    /** Extra Tailwind ClassNames applied to button component */ 
    styles?: string; 
    /** Boolean that prevents the user from clicking or causing hover effects when true */
    disabled?: boolean;
    /** any valid JSX element, best used with SVG to allow text color property to apply  */
    icon: JSX.Element; 
    /** Is the icon on the left or right of the text? */
    iconPosition?: 'left' | 'right';
    /** How large is the button */
    size?: 'small' | 'medium' | 'large' 
}
export default function ButtonWithIcon({
    cb = () => {},
    text = '',
    bgColor = 'bg-sky-500',
    hoverBgColor = 'hover:bg-sky-600',
    textColor = 'text-white',
    styles = '',
    disabled = false,
    icon,
    iconPosition = 'left',
    size='medium',
    ...props
}: ButtonWithIconProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cb();
    };

    const textSizes = {
        small: 'text-sm',
        medium: 'text-md',
        large: 'text-lg'
    };

    const iconSizes = {
        small: 'w-4',
        medium: 'w-6',
        large: 'w-8'
    };

    const paddingSizes = {
        small: 'p-1',
        medium: 'p-2',
        large: 'p-4',
    }

    const Icon = <div className={`${iconSizes[size]} aspect-square ${textColor}`}>{icon}</div>;

    return (
        <button 
            disabled={disabled} 
            className={`${bgColor} ${disabled ? '' : hoverBgColor} ${textColor} ${textSizes[size]} ${paddingSizes[size]} rounded-lg hover:cursor-pointer font-medium w-fit ${styles}`} 
            onClick={e => handleClick(e)}
            {...props}>
            <div className="flex justify-center space-x-1">
                {iconPosition === 'left' ? Icon : ''}
                <p>{text}</p>
                {iconPosition === 'right' ? Icon : ''}
            </div>
        </button>
    )
}
