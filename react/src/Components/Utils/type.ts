export type CardProps = {
  project: Project
}

export type Project = {
  id: string;
  title: string;
  desc: string;
  colorCode: string;
  createdAt: number;
};