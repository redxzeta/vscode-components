import React, { Dispatch, useState, SetStateAction } from 'react';
import MonacoEditor from './monacoEditor';
// import dynamic from "next/dynamic";
// let MonacoEditor = dynamic(() => import("./monacoEditor"), { ssr: false });
import { EditorProvider, modelsInfoType } from './editorContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
export type editorProps = {
  id: string;
  modelsInfo: modelsInfoType;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
  submissionCount?: number;
};
export type sideBarProps = {
  button?: boolean;
  // showSection?: Function
  showSection: () => void;
};

const useStyles = makeStyles({
  gridBox: {
    height: 'auto',
    minHeight: '500px',
  },
  sideBar: {
    backgroundColor: '#2d3233',
    width: '100%',
    height: 'inherit',
    padding: '10px 5px',
  },
  button: {
    color: 'white',
    width: '100%',
    background: '#5e696b',
    fontSize: '8px',
    margin: 'auto',
    // alignItems:"center"
  },
  section: {
    width: '100%',
  },
  components: {
    backgroundColor: '#2d3233',
    width: '100%',
    height: 'auto',
  },
  componentsSection: {
    width: '100%',
    marginLeft: '15px',
  },
  componentsButton: {
    width: '100%',
    height: '10px',
  },
});
const sampleData = [
  {
    _id: '_src',
    name: 'src',
    type: 'folder',
    files: [
      {
        id: '_index',
        name: 'index.tsx',
        type: 'tsx',
      },
    ],
  },
  {
    _id: '_package.json',
    name: 'package.json',
    type: 'json',
  },
];
export default function Editor({
  id,
  modelsInfo,
  onSuccess,
  onFailure,
  submissionCount,
}: editorProps) {
  const classes = useStyles();
  const [active, setActive] = useState(true);
  const showSection = (): void => {
    setActive(!active);
    console.log(active);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={0} className={classes.gridBox}>
        {/* showSection={showSection()} */}
        <Grid className={classes.sideBar} item md={3} xs={12}>
          <Sidebar button={active} showSection={showSection} />
        </Grid>
        <Grid item md={9} xs={12}>
          <EditorProvider>
            <MonacoEditor
              submissionCount={submissionCount}
              onSuccess={onSuccess}
              onFailure={onFailure}
              id={id}
              modelsInfo={modelsInfo}
            />
          </EditorProvider>
        </Grid>
      </Grid>
    </DndProvider>
  );
}

const Sidebar = ({ button, showSection }: sideBarProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      <Button onClick={showSection} className={classes.button}>
        {button ? (
          <ChevronRightIcon fontSize="small" />
        ) : (
          <ExpandMoreIcon fontSize="small" />
        )}{' '}
        <Typography variant="body2">VSCODE-COMPONENTS</Typography>{' '}
        <div style={{ flexGrow: 1 }} />
      </Button>
      <Box className={classes.components}>
        <Box className={classes.componentsSection}>
          <Typography variant="h5">TEST</Typography>
        </Box>
      </Box>
    </Box>
  );
};
