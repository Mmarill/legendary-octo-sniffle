import { Box } from "@chakra-ui/react";
import { H3 } from "@northlight/ui";
import React, { FC } from "react";
import { sortUsersByScore } from "../../utils";
import UserCard from "./UserCard";
import { RankingListProps } from "./interfaces";

const RankingList: FC<RankingListProps> = ({ users }) => {
  const usersSortedByScore = sortUsersByScore(users);
  return (
    <Box>
      <H3 mb={4}>Leader board</H3>
      {usersSortedByScore.map((user, index) => (
        <UserCard index={index} user={user} key={user._id} />
      ))}
    </Box>
  );
};

export default RankingList;
