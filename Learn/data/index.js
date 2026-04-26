import { HTML_CURRICULUM } from './html_lessons';
import { CSS_CURRICULUM } from './css_lessons';
import { JS_CURRICULUM } from './js_lessons';

export const CURRICULUM = [HTML_CURRICULUM, CSS_CURRICULUM, JS_CURRICULUM];

export const getAllLessons = () => {
  const lessons = [];
  CURRICULUM.forEach(topic => {
    topic.lessons.forEach(lesson => {
      lessons.push({ 
        ...lesson, 
        topicId: topic.id, 
        topicTitle: topic.title, 
        topicColor: topic.color 
      });
    });
  });
  return lessons;
};
