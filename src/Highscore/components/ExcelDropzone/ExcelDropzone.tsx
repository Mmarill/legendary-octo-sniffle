import { palette } from "@northlight/tokens";
import { Box, Center } from "@northlight/ui";
import React, { FC } from "react";
import Dropzone from "react-dropzone";
import { read, utils } from "xlsx";
import { ExcelDropzoneProps } from "./interfaces";

const ExcelDropzone: FC<ExcelDropzoneProps> = ({ label, onSheetDrop }) => {
  function handleFile(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    const reader = new window.FileReader();
    reader.onload = function (e) {
      const data = e.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      onSheetDrop(utils.sheet_to_json(workbook.Sheets[sheetName]));
    };
    reader.readAsBinaryString(file);
  }

  return (
    <Dropzone multiple={false} onDrop={handleFile}>
      {({ getRootProps }) => (
        <Box
          {...getRootProps()}
          border="2px dashed"
          bg={palette.gray[50]}
          borderRadius={12}
          cursor="pointer"
          p={6}
          borderColor={palette.gray[200]}
        >
          <Center height="200">{label}</Center>
        </Box>
      )}
    </Dropzone>
  );
};

export default ExcelDropzone;
