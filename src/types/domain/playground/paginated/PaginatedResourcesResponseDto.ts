export interface ResourcesDto {
  id: number;
  userId: number;
  title: string;
  url: string;
  thumbnail: string;
  estimatedTime: string;
  dueDate: string;
  rating?: number;
  completedAt: any;
  position?: number;
  publicReview: string;
  privateNote: string;
  createdAt: Date;
  updatedAt: Date;
  tagId: number;
}

export interface PaginatedResourcesResponseDto {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page?: any;
  next_page: number;
  last_page: number;
  data: ResourcesDto[];
}
