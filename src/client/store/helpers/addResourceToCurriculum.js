import _ from 'lodash';
import { createResource } from '../../api/resources';

const isString = (thing) => typeof thing === 'string';

const id = (objectOrId) => isString(objectOrId) ? objectOrId : objectOrId._id;

const addResourceIdToCurriculum = (state, curriculumId, resourceId) => {
  console.log('state:', state);
  console.log('curriculumId:', curriculumId);
  console.log('resourceId:', resourceId);
  // mutates state.curriculae
  const curriculum = _.first(_.remove(state.curriculae, { _id: curriculumId }));
  console.log('curriculum:', curriculum);
  const newCurriculum = _.assign({}, curriculum, { resourceIds: [...curriculum.resourceIds, resourceId] });
  return _.assign({}, state, { curriculae: [ ...state.curriculae, newCurriculum ] });
};

export const addResourceToCurriculum = (state, resourceOrId, curriculumId) => {
  const resourceId = id(resourceOrId);
  return addResourceIdToCurriculum(state, curriculumId, resourceId);
};
