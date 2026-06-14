import SplitText from "@/components/ui/SplitText";

type Props = {
  index: string;
  kicker: string;
  heading: string;
  className?: string;
  headingClassName?: string;
};

/** Consistent editorial section header: coordinate index + kicker, split heading. */
export default function SectionHeading({
  index,
  kicker,
  heading,
  className,
  headingClassName,
}: Props) {
  return (
    <header className={className}>
      <div
        data-reveal="fade"
        className="mb-7 flex items-center gap-4"
      >
        <span className="index-num">{index}</span>
        <span className="t-coord">{kicker}</span>
      </div>
      <SplitText
        as="h2"
        className={`t-h2 ${headingClassName ?? ""}`}
        text={heading}
      />
    </header>
  );
}
