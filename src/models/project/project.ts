export interface Project {
  uid: string;
  title: string;
  description?: string;
  project_zip: ProjectZip;
}

interface ProjectZip {
  files: string[];
}
