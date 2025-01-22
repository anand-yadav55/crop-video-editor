import React from "react";
import { Button as Btn } from "antd";

export default function Button(props) {
  const styles = {
    ...props.style,
    ...{
      ...(props.disabled
        ? { backgroundColor: "#7C36D680", color: "#ffffff80", border: "none" }
        : ""),
    },
  };
  return (
    <Btn
      size="large"
      {...props}
      {...(!props.variant ? { variant: "solid" } : {})}
      style={styles}
    >
      {props.children}
    </Btn>
  );
}
