import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./types";
import icUploadFromExcel from "../img/ic_upload_from_excel.png";

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    if (this.state.file.size) {
      //console.log("file count ", this.state.file);

      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
          ////console.log(JSON.stringify(this.state.data, null, 2));

          this.props.getJsonDataFromExcel(this.state.data, null, 2);
        });
      };

      if (rABS) {
        reader.readAsBinaryString(this.state.file);
      } else {
        reader.readAsArrayBuffer(this.state.file);
      }
    } else {
      //console.log("file count no file chosen");
    }
  }

  render() {
    return (
      <div className="ExcelReader-upload-Excel-file-picker-container">
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
        <button onClick={this.handleFile}>
          <img alt="upload from excel" src={icUploadFromExcel} />{" "}
          <span>Upload From Excel</span>
        </button>
      </div>
    );
  }
}

export default ExcelReader;
