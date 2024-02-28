import { User } from "../interfaces";

export interface RankingListProps {
  users: User[];
}

export interface UserCardProps {
  user: User;
  index: number;
}

export interface UserScoresProps {
  scores: User["scores"];
  isShowScores?: boolean;
}
