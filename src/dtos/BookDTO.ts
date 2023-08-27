export interface BookInputDTO {
  title: string;
  author: string;
}

export interface BookOutputDTO {
  _id: string;
  title: string;
  author: string;
  rentBy?: string;
}
