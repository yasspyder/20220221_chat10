import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import styles from "./chat.module.css";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => {
  return {
    item: {
      "&.Mui-selected": {
        backgroundColor: "#2b5278",
      },
      "&.Mui-selected:hover": {
        backgroundColor: "#2b5278",
      },
    },
  };
});

export function Chat({
  title,
  selected,
  handleListItemClick,
  deleteConversationByName,
}) {
  const s = useStyles();
  const navigate = useNavigate();
  const state = useSelector((s) => s);

  return (
    <ListItem
      className={s.item}
      button={true}
      selected={selected}
      onClick={handleListItemClick}
      data-testid="wrapper"
    >
      <ListItemIcon>
        <button
          className="test"
          onClick={() => deleteConversationByName(title)}
        >
          x
        </button>
        <AccountCircle fontSize="large" className={styles.icon} />
      </ListItemIcon>
      <div className={styles.description}>
        <ListItemText className={styles.text} primary={title} />
        <ListItemText className={styles.text} primary="12.30" />
      </div>
    </ListItem>
  );
}
