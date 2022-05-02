import * as React from "react";
import Badge from "@mui/material/Badge";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Modal } from "@mantine/core";
import { useState } from "react";
import AddFriend from "../addFriend/addfriend.component";
export default function SimpleBadge() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Badge
        onClick={() => setOpened(true)}
        color='primary'
        sx={{ cursor: "pointer" }}
      >
        <PersonAddIcon color='action' />
      </Badge>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Enter Email to Add Person!'
      >
        <AddFriend />
      </Modal>
    </div>
  );
}
