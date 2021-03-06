import { resourceService } from './service';

// Creates a new resource on the Feathers server and returns the _id
export const createResource = (resource) => (
  resourceService.create(resource).then(res => res._id)
);
