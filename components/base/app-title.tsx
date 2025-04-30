import { cn } from "@/lib/utils";

interface Props {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

interface PageTitleProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const Title: React.FC<Props> = ({ text, children, className }) => {
  const classes = cn(
    "font-inter text-2xl font-semibold leading-8 text-left",
    className,
  );
  return <h2 className={classes}>{text ?? children}</h2>;
};

const Subtitle: React.FC<Props> = ({ text, children, className }) => {
  const classes = cn("text-sm text-muted-foreground", className);
  return <p className={classes}>{text ?? children}</p>;
};

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  const rootClasses = cn("flex flex-col gap-1", className);
  return (
    <div className={rootClasses}>
      <Title text={title} className={titleClassName} />
      {subtitle ? (
        <Subtitle text={subtitle} className={subtitleClassName} />
      ) : null}
      {children}
    </div>
  );
};
