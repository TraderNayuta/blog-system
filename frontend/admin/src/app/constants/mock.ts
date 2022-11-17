import { Category, Post, Tag } from './interfaces';

export const ELEMENT_DATA: Post[] = [
  {
    id: 'hello',
    title: 'Angular 中如何使用自定义构建的 CKeditor',
    tags: [
      {
        name: {
          zh: 'ckeditor',
          en: 'ckeditor',
        },
      },
      { name: { zh: 'angular', en: 'angular' } },
    ],
    categories: [
      { name: { zh: 'frontend', en: 'frontend' } },
      { name: { zh: '富文本', en: 'rick-text' } },
    ],
    content: { zh: 'abc666', en: 'fuck' },
    status: 'draft',
  },
  {
    id: 'good',
    title: 'React DOM Diff 算法解析',
    tags: [
      { name: { zh: 'React', en: 'React' } },
      { name: { zh: 'Diff', en: 'Diff' } },
    ],
    categories: [
      { name: { zh: '前端', en: 'frontend' } },
      {
        name: {
          zh: '算法',
          en: '算法',
        },
      },
    ],
    content: { zh: 'abc666', en: 'fuck' },
    status: 'published',
  },
];

export const categories: Category[] = [
  {
    id: 'fe',
    name: {
      zh: '前端',
      en: 'frontend',
    },
  },
  {
    id: 'be',
    name: {
      zh: '后端',
      en: 'backend',
    },
  },
];

export const tags: Tag[] = [
  {
    id: 'react',
    name: {
      zh: 'React',
      en: 'React',
    },
  },
  {
    id: 'rce',
    name: {
      zh: '富文本编辑器',
      en: 'richtext editor',
    },
  },
];
