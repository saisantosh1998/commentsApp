import React from "react";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";

export function IconBtn({
  Icon,
  icon,
  iconColor,
  isActive,
  children,
  ...props
}) {
  const color = isActive ? '#1565c0' : iconColor;
  return (
    <IconButton {...props}>
      <Stack direction={"row"}>
        <span style={{ color }}>
          <Icon icon={icon} />
        </span>
        {children}
      </Stack>
    </IconButton>
  );
}
