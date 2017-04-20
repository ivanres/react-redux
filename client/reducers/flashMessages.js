import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
	switch(action.type) {
		case ADD_FLASH_MESSAGE:
			return [
				...state,
				Object.assign({
					id: shortid.generate(),
				}, action.message) 
			];

		case DELETE_FLASH_MESSAGE:
			const index = findIndex(state, { id: action.id });
			console.log('reducer: ', action.id, ', index:', index);
			if (index >= 0) {
				return [
					...state.slice(0, index),
					...state.slice(index + 1)
				];
			}
			return state;


		default: 
			return state;
	}

	
}