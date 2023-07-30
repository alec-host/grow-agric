import React, { FormEvent, useEffect ,useState} from 'react';

import { Box, Header, Button, Icon, TextArea, Label, Section, SmallText, Badge } from '@admin-bro/design-system';

import { ActionProps } from 'admin-bro';

import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


//const AdminBro = require('admin-bro');
//const ExcelJS = require('exceljs');


/*

const ExportExcel = (props : ActionProps) =>{
  const { resource } = props;
  const [isExporting, setIsExporting] = useState(false);

  const definedURL = "http://localhost:8590/admin/api/resources/farms/actions/list";

  console.log(definedURL);

  
  //const workbook = new ExcelJS.Workbook();

  const handleExport = async () => {
        try {
            setIsExporting(true);

          
            /*
          const {data} =  await axios.get(definedURL);

          const records = data.records.map(record => record.params);


          const headers = resource.listProperties.map(property => property.label);
          

          const worksheet = workbook.addWorksheet('Sheet1');

           worksheet.addRow(headers);

           records.forEach(record => {
            const rowData = resource.listProperties.map(property => record[property.name]);
            worksheet.addRow(rowData);
           });

          const buf = await workbook.xlsx.writeBuffer();

          console.log(buf);
          saveAs(new Blob([buf]), resource.id+'.xlsx');


          

            setIsExporting(false);
        } catch (error) {
            console.error('Error exporting data:', error);
            setIsExporting(false);
        }
    };

  return (
    <button disabled={isExporting} onClick={handleExport}>
      {isExporting ? 'Exporting...' : 'Export as Excel'}
    </button>
  );


};
*/