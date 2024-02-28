import scores from "../scores";
import users from "../users";
import { User } from "./components/interfaces";

export const sortUsersByScore = (userScores: User[]) => {
  const sortedUsers = userScores.sort((a, b) => {
    const aScore = a.scores[0] || 0;
    const bScore = b.scores[0] || 0;

    return bScore - aScore;
  });

  return sortedUsers;
};

export const handleInitialScores = () => {
  const userScores = users.map((user) => {
    const scores = getUserScoresFromId(user._id);

    return {
      ...user,
      scores: scores,
    };
  });

  return userScores;
};

const getUserScoresFromId = (userId: number) => {
  const previousScores = scores.filter((score) => score.userId === userId);
  const userScores = previousScores.map((score) => score.score);
  const sortedScores = userScores.sort((a, b) => b - a);

  return sortedScores;
};

export const updateUserScores = (
  currentUserScores: User[],
  name: string,
  score: number
) => {
  const userIndex = currentUserScores.findIndex((user) => user.name === name);

  if (userIndex !== -1) {
    const updatedScores = [...currentUserScores[userIndex].scores, score].sort(
      (a, b) => b - a
    );

    const updatedUser = {
      ...currentUserScores[userIndex],
      scores: updatedScores,
    };

    return [
      ...currentUserScores.slice(0, userIndex),
      updatedUser,
      ...currentUserScores.slice(userIndex + 1),
    ];
  } else {
    const newUser = {
      _id: currentUserScores.length + 1,
      name,
      scores: [score],
    };
    return [...currentUserScores, newUser];
  }
};
