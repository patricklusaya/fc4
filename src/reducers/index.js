import { combineReducers } from 'redux';
import GameReducers from './GameReducer';


const Index = combineReducers({
    game: GameReducers,
    
})

export default Index;
