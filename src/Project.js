export class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
  }

  getId() {
    return this.id;
  }

  getProject() {
    return {
      id: this.id,
      title: this.title,
    };
  }
}
