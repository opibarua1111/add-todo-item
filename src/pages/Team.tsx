import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField, Typography } from "@mui/material";
import { borderColor, Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6a1b9a",
    },
    "&:hover fieldset": {
      borderColor: "#1e88e5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const Team = () => {
  const newTodoRef = React.useRef<HTMLInputElement>(null);

  interface Provider {
    todo: string;
  }

  const [todo, setTodo] = React.useState<Provider[]>([]);
  const [loading, setLoading] = React.useState(false);

  const onAddTodo = () => {
    if (newTodoRef.current) {
      const inputValue = newTodoRef.current.value;
      const todoVal: any = JSON.parse(localStorage.getItem("todo")!);
      if (todoVal?.length) {
        const list = [...todo, { todo: inputValue }];
        console.log(list);
        localStorage.setItem("todo", JSON.stringify(list));
        setTodo(list);
      } else {
        const todo = [{ todo: inputValue }];
        localStorage.setItem("todo", JSON.stringify(todo));
        setLoading(true);
      }
      newTodoRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const todoVal: any = JSON.parse(localStorage.getItem("todo")!);
    setTodo(todoVal);
  }, [newTodoRef, loading]);

  const handleDelete = (id: number) => {
    const todoVal: any = JSON.parse(localStorage.getItem("todo")!);
    const filteredVal = todoVal.filter(
      (it: object, index: number) => index !== id
    );
    setTodo(filteredVal);
    localStorage.setItem("todo", JSON.stringify(filteredVal));
  };

  return (
    <Box
      sx={{
        display: "flex",
        mx: "auto",
        backgroundColor: "#4dd0e1",
        paddingBottom: "20px",
      }}
    >
      <Box sx={{ width: "50%" }} style={{}}>
        <CssTextField
          style={{ width: "50%", marginTop: "1.5rem" }}
          label="Added your Member"
          id="custom-css-outlined-input"
          helperText="Please enter your member Name"
          inputRef={newTodoRef}
        />
        <br />
        <Button
          onClick={onAddTodo}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginTop: "1rem", backgroundColor: "green" }}
        >
          Add
        </Button>
      </Box>
      <Box
        sx={{ width: "30%", marginTop: "1.5rem" }}
        style={{ border: "1px solid #1a237e" }}
      >
        <Typography variant="h5" gutterBottom component="div">
          Member List
        </Typography>
        {todo?.length &&
          todo?.map((td, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="center">Member</TableCell>
                <TableCell align="center">{td.todo}</TableCell>
                <TableCell align="center">
                  <Button
                    style={{ color: "#d32f2f", borderColor: "#d32f2f" }}
                    onClick={() => handleDelete(index)}
                    variant="outlined"
                    startIcon={<DeleteIcon style={{ color: "#d32f2f" }} />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </Box>
    </Box>
  );
};

export default Team;
