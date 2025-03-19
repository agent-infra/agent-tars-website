declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.mdx" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}
