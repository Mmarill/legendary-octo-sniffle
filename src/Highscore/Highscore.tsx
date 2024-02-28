import { Box, HStack } from "@chakra-ui/react";
import { H1, P } from "@northlight/ui";
import React, { FC, Fragment, useEffect, useReducer } from "react";
import { ExcelRow } from "./components/ExcelDropzone/interfaces";
import RankingList from "./components/RankingList/RankingList";
import AddUserForm from "./components/AddUserFrom/AddUserForm";
import ExcelDropzone from "./components/ExcelDropzone/ExcelDropzone";
import { initialState, scoreReducer } from "./reducer";

const HighScore: FC = () => {
  const [users, dispatch] = useReducer(scoreReducer, initialState);

  const handleSheetData = (data: ExcelRow[]) => {
    dispatch({ type: "UPDATE_SCORES_FROM_EXCEL", data });
  };

  const handleAddUser = (name: string, score: number) => {
    if (!name) return;

    dispatch({
      type: "ADD_USER",
      name,
      score,
    });
  };

  useEffect(() => {
    dispatch({ type: "INITALIZE_SCORES" });
  }, []);

  return (
    <Fragment>
      <H1 my={6}>Pinball Highscore</H1>
      <HStack
        spacing={{ base: "6vw" }}
        alignItems="start"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box>
          <P mb={4}>
            This is a simple application to display the highscores of a pinball
            machine. The scores are fetched from a fake API and displayed in a
            list. You can also import scores from an excel file or manually add
            a user.
          </P>
          <Box>
            <ExcelDropzone
              onSheetDrop={handleSheetData}
              label="Drop an excel file here or click to import scores"
            />
            <AddUserForm onAddUser={handleAddUser} />
          </Box>
        </Box>
        <RankingList users={users} />
      </HStack>
    </Fragment>
  );
};

export default HighScore;
