import { User } from "./components/interfaces";
import { handleInitialScores, updateUserScores } from "./utils";

interface AddUserAction {
  type: "ADD_USER";
  name: string;
  score: number;
}

interface UpdateScoresFromExcelAction {
  type: "UPDATE_SCORES_FROM_EXCEL";
  data: { name: string; score: number }[];
}

interface InitializeScoresAction {
  type: "INITALIZE_SCORES";
}

type ScoreAction =
  | AddUserAction
  | UpdateScoresFromExcelAction
  | InitializeScoresAction;

export const initialState: User[] = [];

export const scoreReducer = (state: User[], action: ScoreAction): User[] => {
  switch (action.type) {
    case "INITALIZE_SCORES":
      return handleInitialScores();
    case "ADD_USER":
      return updateUserScores(state, action.name, action.score);
    case "UPDATE_SCORES_FROM_EXCEL":
      return action.data.reduce((currentState, row) => {
        return updateUserScores(currentState, row.name, row.score);
      }, state);
    default:
      throw new Error("Invalid action type");
  }
};
