"use client";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";

function page() {
  const handleChange = () => {
    console.log("May nangyare");
  };
  return (
    <div className=" py-36 flex flex-col items-center w-full space-x-2.5">
      <h1>Machine Problem 1</h1>
      <FormControl className=" w-36">
        <InputLabel id="demo-simple-select-label">Choose sir Iggy</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="Sample"
          label="Pre-Defined"
          onChange={handleChange}
        >
          <MenuItem>Pre-Defined</MenuItem>
          <MenuItem>User-Defined</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default page;
