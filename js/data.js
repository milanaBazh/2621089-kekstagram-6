import { getRandomInteger,getRandomArrayElement } from './untils';
import { NAME, DESCRIPTIONS,MESSAGES } from './const';

const generateMessage = () =>{
  const count = getRandomInteger(1,2);
  const selectMessage = [];
  for (let i=0; i< count; i++){
    selectMessage.push(getRandomArrayElement(MESSAGES));
  }

  return selectMessage.join(' ');
};

let commentIdCounter =1;
const generateUnqueCommentId = () => commentIdCounter++;

const generateComments = (count) => {
  const comments =[];
  for (let i=0;i<count; i++){
    comments.push({
      id: generateUnqueCommentId(),
      avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
      message: generateMessage(),
      name:getRandomArrayElement(NAMES)

    });
  }
  return comments;
};

const photos = [];
for (let i=1; i<= PHOTOS_COUNT; i++){
  photos.push({
    id:i,
    url: `photos\${i}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: generateComments(getRandomInteger(0,30))
  });
}
