import React, { useState } from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Container } from '@mui/material';
import dayjs from 'dayjs';
import isHoliday from 'date-holidays';

const PaymentManagerApp = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNumber: '', supplierName: '', invoiceDate: '', paymentTerms: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const addInvoice = () => {
    const { invoiceNumber, supplierName, invoiceDate, paymentTerms } = invoiceDetails;
    if (!invoiceNumber || !supplierName || !invoiceDate || !paymentTerms) {
      return alert('All fields are required.');
    }

    let dueDate = dayjs(invoiceDate).add(parseInt(paymentTerms, 10), 'day');

    // Adjust due date for holidays or weekends (we use Friday as payment day example)
    const hd = new isHoliday('GB');
    while (hd.isHoliday(new Date(dueDate)) || dueDate.day() !== 5) {
      dueDate = dueDate.add(1, 'day');
    }

    setInvoices([...invoices, { invoiceNumber, supplierName, invoiceDate, paymentTerms, dueDate: dueDate.format('YYYY-MM-DD') }]);
    setInvoiceDetails({ invoiceNumber: '', supplierName: '', invoiceDate: '', paymentTerms: '' });
  };

  return (
    <Container>
      <h1>Invoice Payment Manager</h1>
      <form>
        <TextField
          label="Invoice Number"
          name="invoiceNumber"
          value={invoiceDetails.invoiceNumber}
          onChange={handleInputChange}
        />
        <TextField
          label="Supplier Name"
          name="supplierName"
          value={invoiceDetails.supplierName}
          onChange={handleInputChange}
        />
        <TextField
          label="Invoice Date"
          type="date"
          name="invoiceDate"
          value={invoiceDetails.invoiceDate}
          InputLabelProps={{ shrink: true }}
          onChange={handleInputChange}
        />
        <TextField
          label="Payment Terms (Days)"
          name="paymentTerms"
          value={invoiceDetails.paymentTerms}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={addInvoice}>
          Add Invoice
        </Button>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Supplier Name</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>Payment Terms</TableCell>
            <TableCell>Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.supplierName}</TableCell>
              <TableCell>{invoice.invoiceDate}</TableCell>
              <TableCell>{invoice.paymentTerms}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PaymentManagerApp;

// Deployment Suggestions
// 1. You can deploy your React app on platforms like **Netlify**, **Vercel**, or **GitHub Pages**.
// 2. These platforms offer free plans and have easy guides to deploy a React app.
// 3. If you need guidance for deployment, both **Netlify** and **Vercel** provide very straightforward processes:
//    - Just connect your GitHub repository and they take care of the rest with automatic deployments.
// 4. For learning how to use React effectively, you can visit: **reactjs.org/docs** or take free courses on **Scrimba**, **Codecademy**, or **YouTube**.
