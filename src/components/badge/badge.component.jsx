import * as React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Modal } from "@mantine/core";
import { useState } from "react";

export default function SimpleBadge() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <Badge
        onClick={() => setOpened(true)}
        badgeContent={4}
        color='primary'
        sx={{ cursor: "pointer" }}
      >
        <MailIcon color='action' />
      </Badge>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Introduce yourself!'
      >
        text
      </Modal>
    </div>
  );
}
