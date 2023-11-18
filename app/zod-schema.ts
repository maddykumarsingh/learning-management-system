import { z } from 'zod';

export const courseSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(10).max(1000),
    price: z.number().min(0),
    thumbnail: z.string().url(),
  });

export const patchCourseSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(10).max(1000),
    price: z.number().min(0),
    thumbnail: z.string().url(),
});