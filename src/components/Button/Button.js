import cn from "classnames";
import styles from "./Button.module.css";

const Button = ({ className, children, theme, ...restProps }) => {
  return (
    <button
      className={cn(
        styles.container,
        {
          [styles.dark]: theme === "dark",
          [styles.orange]: theme === "orange",
        },
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
