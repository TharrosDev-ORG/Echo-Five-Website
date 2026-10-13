type Props = {
  heading: string;
  lead?: string;
};

/** Inner-page opener: the page's single h1 and its lead. */
export default function PageHeader({ heading, lead }: Props) {
  return (
    <header className="page-header">
      <div className="container">
        <h1 className="t-h1">{heading}</h1>
        {lead ? <p className="t-lead">{lead}</p> : null}
      </div>
    </header>
  );
}
