import React, { Dispatch, SetStateAction } from 'react';
import MonacoEditor from './monacoEditor';
// import dynamic from "next/dynamic";
// let MonacoEditor = dynamic(() => import("./monacoEditor"), { ssr: false });
import { EditorProvider, modelsInfoType } from './editorContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button, Grid, makeStyles } from '@material-ui/core';



export type editorProps = {
  id: string;
  modelsInfo: modelsInfoType;
  onSuccess?: Dispatch<SetStateAction<number>>;
  onFailure?: Function;
  submissionCount?: number;
};
const useStyles = makeStyles({
  gridBox:{
    height:"auto",
    minHeight:"500px"
  },
  sideBar:{
    backgroundColor: '#2d3233',
    width:"100%",
    height:"inherit",
    padding:"10px 0"
  }
})
export default function Editor({
  id,
  modelsInfo,
  onSuccess,
  onFailure,
  submissionCount,
}: editorProps) {
  const classes = useStyles()
  return (
    <DndProvider backend={HTML5Backend}>
    <Grid container spacing ={0} className={classes.gridBox}>
    <Grid className={classes.sideBar} item md={3} xs={12}><Sidebar/></Grid>
    <Grid item md={9} xs={12} >
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

const Sidebar = ()=>{

  return(
    <Button>TEST</Button>
  )
}