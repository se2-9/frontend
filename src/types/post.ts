// src/types/post.ts

export type Post = {
  id: string;
  Title: string;
  Subject: string;
  TutorGender: 'male' | 'female'; // Assuming limited options for gender
  IsOnline: boolean; // True = Online, False = Onsite
  Place: string;
  HourlyRate: number;
  Description: string;
  createdAt: string; // Optional: Timestamp when the post was created
  updatedAt: string; // Optional: Timestamp when the post was last updated
};
