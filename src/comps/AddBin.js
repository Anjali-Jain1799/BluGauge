import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        marginTop: 15
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function AddBin() {
    const classes = useStyles();

    const [state, setState] = React.useState({
        Color: '',
        Capacity: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <div className={classes.root}>
            <Accordion defaultExpanded={false}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Add Bin</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    {/* <div className={classes.column} /> */}
                    <div className={classes.column}>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="bincolor">Color</InputLabel>
                            <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                name="color"
                                inputProps={{
                                    id: 'bincolor',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={'blue'}>Blue</option>
                                <option value={'green'}>Green</option>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="bincapacity">Capacity</InputLabel>
                            <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                name="capacity"
                                inputProps={{
                                    id: 'bincapacity',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={1}>1 cubic meter</option>
                                <option value={3}>3 cubic meter</option>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="Error"
                            defaultValue="Hello World"
                            helperText="Incorrect entry."
                            variant="outlined"
                        />
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="Error"
                            defaultValue="Hello World"
                            helperText="Incorrect entry."
                            variant="outlined"
                        />
                    </div>
                    <div className={clsx(classes.column, classes.helper)}>

                    </div>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}
