export type PostStatus = "PRIVATE" | "PUBLIC" | "ARCHIVED";

export class Post {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public authorId: string,
    public status: PostStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  private validate() {
    if (this.title.length < 5 || this.title.length > 100) {
      throw new Error("Title must be between 5 and 100 characters");
    }
    if (this.content.length < 10 || this.content.length > 10000) {
      throw new Error("Content must be between 10 and 10000 characters");
    }
  }

  public publish() {
    this.status = "PUBLIC";
    this.updatedAt = new Date();
  }

  public archive() {
    this.status = "ARCHIVED";
    this.updatedAt = new Date();
  }

  public update(title: string, content: string) {
    if (this.status !== "PRIVATE") {
      throw new Error("Only private posts can be edited");
    }
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
    this.validate();
  }

  public static create(
    id: string,
    title: string,
    content: string,
    authorId: string,
  ): Post {
    return new Post(
      id,
      title,
      content,
      authorId,
      "PRIVATE", // Initial status
      new Date(),
      new Date(),
    );
  }
}
