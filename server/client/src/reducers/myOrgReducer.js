import { MY_ORG } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case MY_ORG:
    let newTags = []
      action.payload.data.tags.forEach((tag) => {
        let newTag = {
          id: tag.text,
          text: tag.text
        }
        newTags.push(newTag);
      })
      Object.assign(action.payload.data.tags, newTags);
      return action.payload.data|| null;
    default:
      return state;
  }
}