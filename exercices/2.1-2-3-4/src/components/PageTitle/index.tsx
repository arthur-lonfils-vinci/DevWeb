interface PageTitleProps {
  title: string;
}

const PageTitle = (props: PageTitleProps) => {
  return <h1 key={props.title}>{props.title}</h1>;
};

export default PageTitle;
