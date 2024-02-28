import { palette } from "@northlight/tokens";
import { Collapse, Grid, GridItem, P } from "@northlight/ui";
import React, { FC, useState } from "react";
import { UserCardProps, UserScoresProps } from "./interfaces";

const UserCard: FC<UserCardProps> = ({ user, index }) => {
  const [isShowScores, setIsShowScores] = useState(false);

  const toggleShowScores = () => {
    setIsShowScores((isShowScores) => !isShowScores);
  };

  return (
    <Grid
      whiteSpace="nowrap"
      flexDirection="row"
      border="1px solid"
      borderRadius={12}
      minW={280}
      sx={{
        ["&:hover"]: { borderColor: "gray.400", scale: 101 },
        bg: index === 0 ? palette.green[200] : "white",
      }}
      my={1}
      px={6}
      py={1}
      templateColumns="repeat(2, 1fr)"
      cursor="pointer"
      textAlign={{ base: "center", md: "left" }}
      onClick={toggleShowScores}
    >
      <GridItem
        overflowX="hidden"
        textAlign={"left"}
        isTruncated
        sx={{ marginLeft: index !== 0 && 7 }}
      >
        {index === 0 ? "🏆 " : ""}
        {user.name}
      </GridItem>
      <GridItem textAlign={"right"}>
        {user.scores[0]} points
        <UserScores
          isShowScores={isShowScores}
          scores={user.scores.slice(1, user.scores.length)}
        />
      </GridItem>
    </Grid>
  );
};

const UserScores: FC<UserScoresProps> = ({ scores, isShowScores }) => {
  return (
    <Collapse in={isShowScores}>
      {scores.map((score, index) => (
        <P key={index} pt={1}>
          {score} points
        </P>
      ))}
    </Collapse>
  );
};

export default UserCard;
