import React , { useState } from 'react'
import { Grid } from '@material-ui/core'
import AceEditor from "react-ace";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Tokenizer, DefaultTokenizerConfig, TokenFormatter, DefaultLayoutConfig} from '@simonwardjones/sql-formatter'
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    margin: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function SqlViewer() {
  const [text, setText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [maxLineLength, setMaxLineLength ] = useState(DefaultLayoutConfig.maxLineLength)

  const classes = useStyles();

  let tokenizer = new Tokenizer(DefaultTokenizerConfig);
  let tokenFormatter = new TokenFormatter(DefaultLayoutConfig);

  function handleChange(newText){
    console.log(newText)
    setText(newText)
    let tokens = tokenizer.tokenize(newText)
    let formattedText = tokenFormatter.formatTokens(tokens)
    setFormattedText(formattedText)
  }

  function sync(){
    let tokens = tokenizer.tokenize(text)
    let formattedText = tokenFormatter.formatTokens(tokens)
    setFormattedText(formattedText)
  }

  function handleMaxLineLengthChange(event){
    // event.preventDefault();
    console.log('here')
    setMaxLineLength(event.target.value)
    tokenFormatter.config.maxLineLength = event.target.value
    sync()
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.control} variant="h3">
        sql-formatter
      </Typography>
      < Grid container
        justify="space-around"
        className={classes.control}
        spacing={1}>
        <Grid item xs={2}>
          <Typography variant="h6">
              Options
          </Typography>
          <TextField
            id="standard-basic"
            type="number"
            className={classes.textField}
            label="Max line length"
            onChange={handleMaxLineLengthChange}
            margin="normal"
            value={maxLineLength}
          />
        </Grid>
        < Grid item xs={5} >
          <AceEditor
            onChange={handleChange}
            value={text}
            placeholder="In"
            ruler="false"
            name="in"
            width="100%"
            mode="sql"
            theme="monokai"
          >
          </AceEditor>
        </Grid>
        < Grid item xs={5} >
          <AceEditor
            value={formattedText}
            readOnly={true}
            placeholder="Out"
            name="out"
            width="100%"
            mode="sql"
            theme="monokai"
          >
          </AceEditor>
        </Grid>

      </Grid >
    </div>
  )
}
