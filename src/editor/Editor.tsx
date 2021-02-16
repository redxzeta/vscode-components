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
import DescriptionIcon from '@material-ui/icons/Description';
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
    display: 'flex',
    justifyContent: 'flex-start',
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
    width: 'inherit',
    // marginLeft: '15px',

    marginBottom: '10px',
    listStyleType: 'none',
  },
  componentsButton: {
    width: '100%',
    height: '10px',
  },
  itemButton: {
    color: 'white',
    width: '80%',
    height: '30px',
    fontSize: '10px',
    marginRight: 'auto',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#a5b1b3',
  },
  subItemFolder: {
    justifyContent: 'flex-start',
    fontSize: '5px',
  },
  right: {
    flexGrow: 1,
  },
  buttonText: {
    marginLeft: '5px',
    marginRight: '5px',
  },
});
const sampleData = [
  {
    _id: '_src',
    name: 'src',
    type: 'folder',
    files: [
      {
        id: 'index.tsx',
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
  {
    _id: '_styles',
    name: 'styles',
    type: 'folder',
    files: [
      {
        id: '_app.js',
        name: 'app.js',
        type: 'js',
      },
      {
        id: '_style.css',
        name: 'style.css',
        type: 'css',
      },
    ],
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
  const [showReport, setshowReport] = useState({});
  const classes = useStyles();
  const toggleReports = (id: 'string') => {
    const index = sampleData.findIndex(el => el._id === id);
    setshowReport((prevshowReport: 'string') => ({
      ...(showReport as {}),
      [id]: !prevshowReport[index],
    }));
  };
  return (
    <Box className={classes.section}>
      <Button onClick={showSection} className={classes.button}>
        {button ? (
          <ChevronRightIcon fontSize="small" />
        ) : (
          <ExpandMoreIcon fontSize="small" />
        )}{' '}
        <Typography variant="body2">VSCODE-COMPONENTS</Typography>{' '}
      </Button>

      {!button && (
        <Box className={classes.components}>
          <ul className={classes.componentsSection}>
            {sampleData.map(file => {
              return (
                <li>
                  <Button className={classes.itemButton} key={file._id}>
                    {file.type === 'folder' ? (
                      <FolderIcon />
                    ) : (
                      <DescriptionIcon />
                    )}
                    <span className={classes.buttonText}>{file.name}</span>
                  </Button>
                </li>
              );
            })}
          </ul>
        </Box>
      )}
    </Box>
  );
};
